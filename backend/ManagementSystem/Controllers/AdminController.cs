using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManagementSystem.Services;
using ManagementSystem.Transfer.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private IUserService _userService;

        public AdminController(IUserService userService, DatabaseContext context)
        {
            DB = context;
            _userService = userService;

        }

        [Authorize(Roles = "admin")]
        [HttpPost("Users_list")]
        public IActionResult UsersList([FromBody]UserListFilterDTO filter)
        {

            return Ok(_userService.List(filter));

        }

        [Authorize(Roles = "admin")]
        [HttpPost("Getuser/{Id}")]
        public IActionResult Getuser(int Id)
        {
            return Ok(_userService.GetUserToEdit(Id));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("Edit_user")]
        public IActionResult EditUser([FromBody]EditUserDTO editData)
        {
            return Ok(_userService.EditUser(editData));
        }

    }
}