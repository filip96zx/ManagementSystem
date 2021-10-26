using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManagementSystem.Services;
using ManagementSystem.Transfer.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {

        private IManagerService _managerService;

        public ManagerController(IManagerService managerService, DatabaseContext context)
        {
            DB = context;
            _managerService = managerService;
        }

        [Authorize(Roles = "manager")]
        [HttpPost("get_orders_toaccept")]
        public IActionResult GetOrdersToAccept()
        {

            return Ok(_managerService.GetOrdersToAccept());

        }

        [Authorize(Roles = "manager")]
        [HttpPost("get_orders_finished")]
        public IActionResult UsersList()
        {

            return Ok(_managerService.GetOrdersFinished());

        }

        [Authorize(Roles = "manager")]
        [HttpPost("get_orders_during")]
        public IActionResult GetOrdersDuring()
        {

            return Ok(_managerService.GetOrdersDuring());

        }

        [Authorize(Roles = "manager")]
        [HttpPost("assign_worker")]
        public IActionResult AssignWorker([FromBody]AssignWorkerDTO data)
        {

            return Ok(_managerService.AssignWorker(data.WorkerId, data.OrderId, data.Price));

        }

        [Authorize(Roles = "manager")]
        [HttpPost("get_workers")]
        public IActionResult GetWorkers()
        {

            return Ok(_managerService.GetWorkers());

        }

        [Authorize(Roles = "manager")]
        [HttpPost("get_order_detail/{Id}")]
        public IActionResult GetOrderDetails(int Id)
        {

            return Ok(_managerService.GetOrderDetails(Id));

        }

    }
}