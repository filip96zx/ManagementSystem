using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Transfer
{
    public class OrderDetailsDTO
    {
        public int Id { get; set; }
        public string Customer { get; set; }
        public string Worker { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime Order_Date { get; set; }
        public DateTime? Finish_Date { get; set; }
        public string Price { get; set; }
        public bool Finished { get; set; }
    }
}
