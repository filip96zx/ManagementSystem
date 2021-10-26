using ManagementSystem.Models;
using ManagementSystem.Transfer;
using ManagementSystem.Transfer.Manager;
using ManagementSystem.Transfer.Worker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Services
{
    public interface IWorkerService
    {
        IEnumerable<OrderListDTO> GetOrdersListFinished(int workerId);
        IEnumerable<OrderListDTO> GetOrdersListNotFinished(int workerId);
        OrderDetailsDTO GetOrderDetails(int orderId);
        string Addstatus(string status, int orderId);
        string FinishOrder(int orderId);
        CustomerDetailsDTO GetCustomerDetails(int customerId);
    }
    public class WorkerService : IWorkerService
    {
        DatabaseContext DB;

        public WorkerService(DatabaseContext DB)
        {
            this.DB = DB;
        }


        public IEnumerable<OrderListDTO> GetOrdersListNotFinished(int workerId)
        {
            IQueryable<Order> result = DB.Orders;

            result = result.Where(res =>  res.Worker_Id == workerId && res.Finished == false);

            return result.Take(1000).Select(res =>
            new OrderListDTO
            {
                Id = res.Id,
                Customer = DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Surname,
                Worker = DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Surname,
                Status = res.Status,
                Order_Date = res.Order_Date,
            });

        }

        public IEnumerable<OrderListDTO> GetOrdersListFinished(int workerId)
        {
            IQueryable<Order> result = DB.Orders;

            result = result.Where(res => res.Worker_Id == workerId && res.Finished == true);

            return result.Take(1000).Select(res =>
            new OrderListDTO
            {
                Id = res.Id,
                Customer = DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Customer_Id).Surname,
                Worker = DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Name + " " + DB.Users.SingleOrDefault(usr => usr.Id == res.Worker_Id).Surname,
                Status = res.Status,
                Order_Date = res.Order_Date,
            });

        }

        public Order GetOrder(int orderId)
        {
            return DB.Orders.SingleOrDefault(result => result.Id == orderId);
        }

        public string Addstatus(string status, int orderId)
        {
            Order order = GetOrder(orderId);

            order.Status += "\n" + DateTime.Now.ToString("f") + " " + status;
            DB.SaveChanges();

            return "ok";
        }

        public string FinishOrder(int orderId)
        {
            Order order = GetOrder(orderId);
            order.Status += "\n" + DateTime.Now.ToString("f")+ " " + "Zakończenie zlecenia.";
            order.Finish_Date = DateTime.Now;
            order.Finished = true;
            DB.SaveChanges();
            return "ok";
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

        public CustomerDetailsDTO GetCustomerDetails(int orderId)
        {
            Order order = DB.Orders.SingleOrDefault(result => result.Id == orderId);
            User customer = DB.Users.SingleOrDefault(result => result.Id == order.Customer_Id);
            return new CustomerDetailsDTO
            {
                Name = customer.Name,
                Surname = customer.Surname,
                Email = customer.Email,
                Phone = customer.Phone,
                Address = customer.Address,
                City = customer.City
            };
        }
    }
}
