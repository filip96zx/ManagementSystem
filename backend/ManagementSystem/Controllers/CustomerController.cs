using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManagementSystem.Services;
using ManagementSystem.Transfer.Customer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerService _customerService;
        public CustomerController(DatabaseContext DB, ICustomerService customerService)
        {
            this.DB = DB;
            _customerService = customerService;
        }


        [Authorize(Roles = "user")]
        [HttpPost("order_list_notfinished")]
        public IActionResult OrdersNotFinished()
        {

            return Ok(_customerService.GetOrdersListNotFinished(CurrentUser().Id));

        }
        [Authorize(Roles = "user")]
        [HttpPost("order_list_finished")]
        public IActionResult OrdersFinished()
        {

            return Ok(_customerService.GetOrdersListFinished(CurrentUser().Id));

        }
        [Authorize(Roles = "user")]
        [HttpPost("order_create")]
        public IActionResult CreateOrder([FromBody]CreateOrderDTO order)
        {

            return Ok(_customerService.CreateOrder(order.Description, CurrentUser().Id));

        }

        [Authorize(Roles = "user")]
        [HttpPost("get_order_detail/{Id}")]
        public IActionResult GetOrder(int Id)
        {

            return Ok(_customerService.GetOrderDetails(Id));

        }

    }
}