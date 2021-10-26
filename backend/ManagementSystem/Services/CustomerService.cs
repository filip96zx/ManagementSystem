using ManagementSystem.Models;
using ManagementSystem.Transfer;
using ManagementSystem.Transfer.Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Services
{   
    public interface ICustomerService
    {
        IEnumerable<OrderListDTO> GetOrdersListNotFinished(int customerId);
        IEnumerable<OrderListDTO> GetOrdersListFinished(int customerId);
        string CreateOrder(string orderDescription, int customerId);
        OrderDetailsDTO GetOrderDetails(int orderId);

    }
    public class CustomerService : ICustomerService
    {
        DatabaseContext DB;

        public CustomerService(DatabaseContext DB)
        {
            this.DB = DB;
        }

        public string CreateOrder(string orderDescription, int customerId)
        {
            Order order = new Order
            {

                Customer_Id = customerId,
                Description = orderDescription,
                Status = DateTime.Now.ToString("f") + " " + "Rozpoczęcie zlecenia.",
                Order_Date = DateTime.Now,
                Finish_Date = null,
                Finished = false

            };

            DB.Orders.Add(order);
            DB.SaveChanges();
            return "ok";

        }

        public IEnumerable<OrderListDTO> GetOrdersListNotFinished(int customerId)
        {
            IQueryable<Order> result = DB.Orders;

            result = result.Where(res => res.Customer_Id == customerId && res.Finished == false);

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

        public IEnumerable<OrderListDTO> GetOrdersListFinished(int customerId)
        {
            IQueryable<Order> result = DB.Orders;

            result = result.Where(res => res.Customer_Id == customerId && res.Finished == true);

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
