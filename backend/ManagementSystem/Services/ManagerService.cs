using ManagementSystem.Models;
using ManagementSystem.Transfer;
using ManagementSystem.Transfer.Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Services
{
    public interface IManagerService
    {
        IEnumerable<OrderListDTO> GetOrdersToAccept();
        IEnumerable<OrderListDTO> GetOrdersFinished();
        IEnumerable<OrderListDTO> GetOrdersDuring();
        string AssignWorker(int workerId, int orderId, string price);
        IEnumerable<WorkerListDTO> GetWorkers();
        OrderDetailsDTO GetOrderDetails(int orderId);

    }

    public class ManagerService : IManagerService
    {
        DatabaseContext DB;
        public ManagerService(DatabaseContext DB)
        {
            this.DB = DB;
        }

        public IEnumerable<OrderListDTO> GetOrdersToAccept()
        {
            IQueryable<Order> result = DB.Orders;

            result = result.Where(res => res.Finished == false && res.Worker_Id == null);

            return result.Take(1000).Select(res =>
            new OrderListDTO
            {
                Id = res.Id,
                Customer = DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Surname,
                Worker = "",
                Status = res.Status,
                Order_Date = res.Order_Date,
            }
           );


        }

        public IEnumerable<OrderListDTO> GetOrdersFinished()
        {
            IQueryable<Order> result = DB.Orders;

            result = result.Where(res => res.Finished == true);

            return result.Take(1000).Select(res =>
            new OrderListDTO
            {
                Id = res.Id,
                Customer = DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Surname,
                Worker = DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Surname,
                Status = res.Status,
                Order_Date = res.Order_Date,
            }
           );


        }

        public IEnumerable<OrderListDTO> GetOrdersDuring()
        {
            IQueryable<Order> result = DB.Orders;

            result = result.Where(res => res.Worker_Id.HasValue && res.Finished == false);

            return result.Take(1000).Select(res =>
            new OrderListDTO
            {
                Id = res.Id,
                Customer = DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Surname,
                Worker = DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Surname,
                Status = res.Status,
                Order_Date = res.Order_Date,
            }
           );


        }

        public string AssignWorker(int workerId, int orderId, string price)
        {
            Order order = DB.Orders.SingleOrDefault(result => result.Id == orderId);
            order.Worker_Id = workerId;
            order.Price = price;
            DB.SaveChanges();
            return "ok";
        }


        public IEnumerable<WorkerListDTO> GetWorkers()
        {
            IQueryable<User> workers = DB.Users.Where(user => user.Role == User.Roles.worker);

            return workers.Select(result => new WorkerListDTO
            {
                WorkerId = result.Id,
                Name = result.Name + " " + result.Surname,
                OrderCount = DB.Orders.Where(res => res.Worker_Id == result.Id && res.Finished == false).Count()
            });

        }
        public Order GetOrder(int orderId)
        {
            return DB.Orders.SingleOrDefault(result => result.Id == orderId);
        }

        public OrderDetailsDTO GetOrderDetails(int orderId)
        {
            Order order = DB.Orders.SingleOrDefault(result => result.Id == orderId);
            OrderDetailsDTO obj = new OrderDetailsDTO
            {
                Id = order.Id,
                Customer = DB.Users.SingleOrDefault(usr => usr.Id == order.Customer_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == order.Customer_Id).Surname,
                Description = order.Description,
                Status = order.Status,
                Order_Date = order.Order_Date,
                Finish_Date = order.Finish_Date,
                Price = order.Price,
                Finished = order.Finished,
            };
            if (order.Worker_Id.HasValue)
                obj.Worker = DB.Users.SingleOrDefault(usr => usr.Id == order.Worker_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == order.Worker_Id).Surname;
            return obj;
        }

    }
}

