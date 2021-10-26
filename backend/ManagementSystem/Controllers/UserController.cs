using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManagementSystem.Models;
using ManagementSystem.Services;
using ManagementSystem.Transfer.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;



        public UserController(IUserService userService, DatabaseContext context)
        {
            DB = context;
            _userService = userService;

        }

        /*/ GET: api/User
         [AllowAnonymous]
         [HttpGet]
         public IEnumerable<User> Get()
         {


             return result;
         }

         // GET: api/User/5
         [HttpGet("{id}", Name = "Get")]
         public string Get(int id)
         {
             return "value";
         }
         */
        // POST: api/User
        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Register([FromBody]RegisterDTO register) 
        {
            
            return Ok(_userService.RegisterUser(register));

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginDTO loginData)
        {

            return Ok(_userService.UserLogin(loginData));

        }
        //[AllowAnonymous]
        //[HttpPost("send")]
        //public IActionResult Send()
        //{
        //    return Ok(EmailSender.Send("filip96zx@gmail.com", "asd,", "asdasdas"));
        //}
        
        [Authorize]
        [HttpPost("Who")]
        public IActionResult Who()
        {

            return Ok(CurrentUser());

        }


        [Authorize]
        [HttpPost("Updateprofile")]
        public IActionResult Updateprofile([FromBody]EditProfileDTO editData)
        {

            return Ok(_userService.UpdateProfile(CurrentUser().Id, editData));
        }
        [Authorize]
        [HttpPost("Getprofile")]
        public IActionResult Getprofile()
        {

            return Ok(_userService.GetProfile(CurrentUser().Id));
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword([FromBody]ChangePasswordDTO passwords)
        {

            return Ok(_userService.ChangePassword(CurrentUser(), passwords.OldPassword, passwords.NewPassword));

        }

        [Authorize(Roles = "admin, user")]
        [HttpPost("Getuser/{Id}")]
        public IActionResult Getuser(int Id)
        {
            return Ok(_userService.GetUser(Id));
        }

        [AllowAnonymous]
        [HttpGet("Activate/{code}")]
        public IActionResult Activate(string code)
        {

            return Ok(_userService.ActivateUser(code));
        }

        [AllowAnonymous]
        [HttpPost("SendRestartpassword")]
        public IActionResult SendRestartpassword([FromBody]EmailDTO email)
        {

            return Ok(_userService.SendRestartEmail(email.Email));
        }

        [AllowAnonymous]
        [HttpGet("Restartpassword/{code}")]
        public IActionResult Restartpassword(string code)
        {

            return Ok(_userService.RestartPassword(code));
        }

        // PUT: api/User/5

    }
}
