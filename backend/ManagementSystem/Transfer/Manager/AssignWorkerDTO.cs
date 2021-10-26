using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Transfer.Manager
{
    public class AssignWorkerDTO
    {
        public int WorkerId { get; set; }
        public int OrderId { get; set; }
        public string Price { get; set; }
    }
}
