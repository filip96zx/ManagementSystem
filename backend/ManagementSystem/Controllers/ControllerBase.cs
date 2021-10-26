using ManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ManagementSystem.Controllers
{
    public abstract class ControllerBase : Controller
    {
        protected User CurUser;

        protected DatabaseContext DB { get; set; }

        
        public override void OnActionExecuting(Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext actionExecutingContext)
        {
            if (!actionExecutingContext.ModelState.IsValid)
                actionExecutingContext.Result = StatusCode(422, actionExecutingContext.ModelState.ToDictionary(x => x.Key, x => x.Value.Errors.Select(y => y.ErrorMessage)));

            if (User == null)
                return;
            string Email = User.FindFirstValue("Email");

            if (Email != null)
            {
                CurUser = DB.Users.SingleOrDefault(user => user.Email == Email);
            }

        }

        protected User CurrentUser()
        {
            return CurUser;
        }

    }
}
