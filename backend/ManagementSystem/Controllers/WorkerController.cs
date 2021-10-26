using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManagementSystem.Services;
using ManagementSystem.Transfer.Worker;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private IWorkerService _workerService;

        public WorkerController(DatabaseContext DB, IWorkerService workerService)
        {
            this.DB = DB;
            _workerService = workerService;
        }

        [Authorize(Roles = "worker")]
        [HttpPost("get_orders_finished")]
        public IActionResult GetOrdersList()
        {

            return Ok(_workerService.GetOrdersListFinished(CurrentUser().Id));

        }
        [Authorize(Roles = "worker")]
        [HttpPost("get_orders_notfinished")]
        public IActionResult GetOrdersListnotfinished()
        {

            return Ok(_workerService.GetOrdersListNotFinished(CurrentUser().Id));

        }

        [Authorize(Roles = "worker")]
        [HttpPost("get_order_detail/{Id}")]
        public IActionResult GetOrderDetails(int Id)
        {

            return Ok(_workerService.GetOrderDetails(Id));

        }

        [Authorize(Roles = "worker")]
        [HttpPost("update_status")]
        public IActionResult UpdateStatus([FromBody]UpdateStatusDTO data)
        {

            return Ok(_workerService.Addstatus(data.Status, data.OrderId));

        }

        [Authorize(Roles = "worker")]
        [HttpPost("finish_order")]
        public IActionResult FinishOrder([FromBody]int orderId)
        {

            return Ok(_workerService.FinishOrder(orderId));

        }

        [Authorize(Roles = "worker")]
        [HttpPost("get_customer_details/{Id}")]
        public IActionResult GetCustomerDetail(int Id)
        {

            return Ok(_workerService.GetCustomerDetails(Id));

        }

    }
}