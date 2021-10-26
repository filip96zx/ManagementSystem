using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Transfer.Worker
{
    public class UpdateStatusDTO
    {
        public int OrderId { get; set; }
        public string Status { get; set; }
    }
}
