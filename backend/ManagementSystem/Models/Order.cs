using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Models
{
    public class Order
    {

        public int Id { get; set; }
        public int Customer_Id { get; set; }
        public int? Worker_Id { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime Order_Date { get; set; }
        public DateTime? Finish_Date { get; set; }
        public string Price { get; set; }
        public bool Finished { get; set; }
    }
}
