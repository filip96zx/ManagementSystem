using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Transfer.Manager
{
    public class OrderListDTO
    {
        public int Id { get; set; }
        public string Customer { get; set; }
        public string Worker { get; set; }
        public string Status { get; set; }
        public DateTime Order_Date { get; set; }
    }
}
