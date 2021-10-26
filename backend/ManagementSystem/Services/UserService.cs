using ManagementSystem.Models;
using ManagementSystem.Transfer.Admin;
using ManagementSystem.Transfer.User;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ManagementSystem.Services
{
    public interface IUserService
    {
        string RegisterUser(RegisterDTO registerData);
        TokenDTO UserLogin(LoginDTO loginData);
        void SetPassword(User user, string password);
        User GetUser(int Id);
        string UpdateProfile(int userId, EditProfileDTO editData);
        string EditUser(EditUserDTO editData);
        string ActivateUser(string code);
        string SendRestartEmail(string email);
        string RestartPassword(string code);
        string ChangePassword(User user, string oldPassword, string newPassword);
        IEnumerable<UserListDTO> List(UserListFilterDTO filter);
        GetUserDTO GetUserToEdit(int Id);
        EditProfileDTO GetProfile(int userId);

    }

    public class UserService : IUserService
    {
        private DatabaseContext DB { get; set; }
        readonly IConfiguration config;

        public UserService(DatabaseContext DB, IConfiguration config)
        {
            this.DB = DB;
            this.config = config;
        }


        public void SetPassword(User user, string password)
        {
            string salt = GetSalt();
            user.Password = HashPassword(password, salt);
            user.PasswordSalt = salt;

        }

        public bool IsPasswordCorrect(User user, string password)
        {
            return user.Password == HashPassword(password, user.PasswordSalt);
        }

        private string GetSalt()
        {
            RandomNumberGenerator rnd = RandomNumberGenerator.Create();
            byte[] salt = new byte[16];
            rnd.GetBytes(salt);
            return Convert.ToBase64String(salt);
        }
        private string HashPassword(string pswd, string salt)
        {
            pswd += salt;
            SHA256 sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(pswd);
            byte[] hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }


        public string RegisterUser(RegisterDTO user)
        {
            if (DB.Users.Any( usr => usr.Email == user.Email))
                return "User Exists";

            User newUser = new User
            {
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                DateOfBirth = user.DateOfBirth,
                Phone = user.Phone,
                Address = user.Address,
                City = user.City,
                Role = User.Roles.user,
                IsActive = false,
                IsLocked = false
            };
            SetPassword(newUser, user.Password);
            DB.Users.Add(newUser);
            DB.SaveChanges();
            EmailSender.ActiveEmail(DB.Users.SingleOrDefault(usr => usr.Email == newUser.Email), DB);

            return "Registered Succesfully";
        }

        public TokenDTO CreateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Secret"]));
            int exp = int.Parse(config["JwtSettings:Expires"]);
            var token = new JwtSecurityToken("http://localhost:60068/",
                "http://localhost:60068/",
                claims: new List<Claim>
                {
                    new Claim("Email", user.Email),
                    new Claim("Name", user.Name),
                    new Claim("Surname", user.Surname),
                    new Claim("Role", user.Role.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                },
                expires: DateTime.Now.AddMinutes(exp),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)) ;;

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return new TokenDTO
            {
                Token = tokenString,
                LoginResult = TokenDTO.LoginResults.Ok.ToString()
            };
        }

        public TokenDTO UserLogin(LoginDTO loginData)
        {
            User user = DB.Users.SingleOrDefault(user => user.Email == loginData.Email);
            if (user != null && IsPasswordCorrect(user, loginData.Password))
            {
                if (!user.IsLocked)
                    return CreateToken(user);
                else return new TokenDTO { LoginResult = TokenDTO.LoginResults.IsLocked.ToString() };

            }
            else return new TokenDTO { LoginResult= TokenDTO.LoginResults.WrongData.ToString() };
            
        }


        public User GetUser(int Id)
        {
            User user = DB.Users.SingleOrDefault(u => u.Id == Id);


            return user;
        }
        public  GetUserDTO GetUserToEdit(int Id)
        {
            User user = DB.Users.SingleOrDefault(u => u.Id == Id);
            GetUserDTO result = new GetUserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                DateOfBirth = user.DateOfBirth,
                Phone = user.Phone,
                Address = user.Address,
                City = user.City,
                Role = user.Role,
                IsActive = user.IsActive,
                IsLocked = user.IsLocked,

            };
            return result;
        }

        public string UpdateProfile(int userId, EditProfileDTO editData)
        {
            User user = GetUser(userId);

            user.Phone = editData.Phone;
            user.Name = editData.Name;
            user.Surname = editData.Surname;
            user.Address = editData.Address;
            user.City = editData.City;
            
            DB.SaveChanges();

            return "ok";

        }
        public EditProfileDTO GetProfile(int userId)
        {
            User user = GetUser(userId);
            EditProfileDTO result = new EditProfileDTO
            {
                Name = user.Name,
                Surname = user.Surname,
                Address = user.Address,
                Phone = user.Phone,
                City = user.City,
            };
            return result;
        }

        public string EditUser(EditUserDTO editData)
        {
            User user = GetUser(editData.Id);

            user.DateOfBirth = editData.DateOfBirth;
            user.Role = editData.Role;
            user.IsActive = editData.IsActive;
            user.Role = editData.Role;


            DB.SaveChanges();

            return "ok";

        }



        public string ActivateUser(string code)
        {
            EmailCommand action = DB.EmailCommand.SingleOrDefault(u => u.Code == code);
            User user = GetUser(action.UserId);
            user.IsActive = true;
            DB.EmailCommand.Remove(action);
            DB.SaveChanges();

            return "Activated";
        }

        public string RestartPassword(string code)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string password = new string(Enumerable.Repeat(chars, 8).Select(s => s[random.Next(s.Length)]).ToArray());

            EmailCommand action = DB.EmailCommand.SingleOrDefault(u => u.Code == code);
            User user = GetUser(action.UserId);
            SetPassword(user, password);
            DB.SaveChanges();
            EmailSender.Send(user.Email,"Nowe hasło", $"Nowe hasło do konta: {password}" );
            return "ok";
        }

        public string ChangePassword(User user, string oldPassword, string newPassword)
        {
            if(IsPasswordCorrect(user, oldPassword))
            {
                SetPassword(user, newPassword);
                DB.SaveChanges();
                return "ok";
            }

            return "Wrong password";
        }

        public string SendRestartEmail(string email)
        {
           // EmailCommand action = DB.EmailCommand.SingleOrDefault(u => u.Code == code);
            EmailSender.ResetPasssword(email, DB);
            return "Email sent";
        }

        public IEnumerable<UserListDTO> List(UserListFilterDTO filter)
        {
            IQueryable<User> result = DB.Users;

            if (!string.IsNullOrEmpty(filter.Name))
                result = result.Where(res => res.Name.Contains(filter.Name));


            if (!string.IsNullOrEmpty(filter.Surname))
                result = result.Where(res => res.Surname.Contains(filter.Surname));



            if (filter.Role.HasValue)
                result = result.Where(res => res.Role == filter.Role.Value);


            switch (filter.Sort)
            {
                case "Name":

                    if (filter.SortDesc.HasValue && filter.SortDesc.Value)
                        result = result.OrderByDescending(res => res.Name);
                    else
                        result = result.OrderBy(res => res.Name);

                    break;

                case "Surname":

                    if (filter.SortDesc.HasValue && filter.SortDesc.Value)
                        result = result.OrderByDescending(res => res.Surname);
                    else
                        result = result.OrderBy(res => res.Surname);

                    break;

                case "Email":

                    if (filter.SortDesc.HasValue && filter.SortDesc.Value)
                        result = result.OrderByDescending(res => res.Email);
                    else
                        result = result.OrderBy(res => res.Email);

                    break;

                case "Role":

                    if (filter.SortDesc.HasValue && filter.SortDesc.Value)
                        result = result.OrderByDescending(res => res.Role);
                    else
                        result = result.OrderBy(res => res.Role);

                    break;

                default:
                    result = result.OrderBy(res => res.Surname);
                    break;
            }

            return result.Take(250).Select(res => new UserListDTO { 
                Id = res.Id,
                Email = res.Email,
                Name = res.Name,
                Surname = res.Surname,
                Phone = res.Phone,
                Role = res.Role          
            });
        }


    }
}
