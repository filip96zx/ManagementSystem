using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ManagementSystem.Models.User;

namespace ManagementSystem.Transfer.Admin
{
    public class EditUserDTO
    {
        public int Id { get; set; }

        public DateTime DateOfBirth { get; set; }

        public Roles Role { get; set; }

        public bool IsActive { get; set; }

        public bool IsLocked { get; set; }

    }
}
