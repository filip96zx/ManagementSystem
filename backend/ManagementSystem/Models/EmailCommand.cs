using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ManagementSystem.Models
{
    public class EmailCommand
    {
        public enum Actions { activateEmail = 0, restartPassword = 1 }
        public int Id { get; set; }
        public int UserId { get; set; }
        public Actions Command { get; set; }
        [StringLength(128)] [Required]  public string Code { get; set; }

    }
}
