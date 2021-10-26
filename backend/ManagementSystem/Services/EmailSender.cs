using ManagementSystem.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ManagementSystem.Services
{
    public class EmailSender
    {
        private static SmtpClient Client;
        private static MailMessage Message;
        public static void ConfigureClient(IConfiguration config)
        {
            Client = new SmtpClient
            {
                UseDefaultCredentials = false,
                EnableSsl = true,
                Host = config["Email:MailServer"],
                Credentials = new System.Net.NetworkCredential(config["Email:Login"], config["Email:Password"])
            };

            Message = new MailMessage
            {
                From = new MailAddress(config["Email:Login"], config["Email:SenderName"]),
                IsBodyHtml = true
            };
        }

        private static Random random = new Random();
        private static string CodeGenerator(int lenght)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, lenght)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static bool Send(string receiver, string subject, string text)
        {
            Message.To.Clear();
            Message.To.Add(receiver);
            Message.Subject = subject;
            Message.Body = text;
            try
            {
                Client.Send(Message);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool ActiveEmail(User user, DatabaseContext DB)
        {
            string code = CodeGenerator(128);

            string activeUrl = $"http://localhost:60068/api/user/activate/{code}";

            var oldAction = DB.EmailCommand.SingleOrDefault(x => x.UserId == user.Id && x.Command == EmailCommand.Actions.activateEmail);

            if (oldAction != null)
                DB.EmailCommand.Remove(oldAction);

            DB.EmailCommand.Add(new EmailCommand
            {
                UserId = user.Id,
                Command = EmailCommand.Actions.activateEmail,
                Code = code
            });
            DB.SaveChanges();

            return Send(
                user.Email,
                "Aktywacja konta",
                $"Dziękujemy za skorzystanie z naszych usług.<br>Aby potwiedzić aktywację Twojego konta wejdź w poniższy link: <br><a href=\"{activeUrl}\">AKTYWUJ KONTO</a>"
                );
        }

        public static bool ResetPasssword(string email, DatabaseContext DB)
        {
            string code = CodeGenerator(128);

            string restartUrl = $"http://localhost:60068/api/user/restartpassword/{code}";
            User user = DB.Users.SingleOrDefault(x => x.Email == email );

            var oldAction = DB.EmailCommand.SingleOrDefault(x => x.UserId == user.Id && x.Command == EmailCommand.Actions.restartPassword);

            if (oldAction != null)
                DB.EmailCommand.Remove(oldAction);

            DB.EmailCommand.Add(new EmailCommand
            {
                UserId = user.Id,
                Command = EmailCommand.Actions.restartPassword,
                Code = code
            });
            DB.SaveChanges();

            return Send(
                user.Email,
                "Restart hasła",
                $"Aby zrestartować hasło kliknij poniższy link <br><a href=\"{restartUrl}\">Resetuj Hasło</a>"
                );
        }

        public static bool SendNewPasssword(string email, DatabaseContext DB)
        {
            string code = CodeGenerator(128);

            string restartUrl = $"http://localhost:60068/api/user/restartpassword/{code}";

            User user = DB.Users.SingleOrDefault(x => x.Email == email);

            var oldAction = DB.EmailCommand.SingleOrDefault(x => x.UserId == user.Id && x.Command == EmailCommand.Actions.activateEmail);

            if (oldAction != null)
                DB.EmailCommand.Remove(oldAction);

            DB.EmailCommand.Add(new EmailCommand
            {
                UserId = user.Id,
                Command = EmailCommand.Actions.restartPassword,
                Code = code
            });
            DB.SaveChanges();

            return Send(
                user.Email,
                "Restart hasła",
                $"Aby zrestartować hasło kliknij poniższy link <br><a href=\"{restartUrl}\">Resetuj Hasło</a>"
                );
        }


    }
}
