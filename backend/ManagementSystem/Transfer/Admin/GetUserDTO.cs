using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ManagementSystem.Models.User;

namespace ManagementSystem.Transfer.Admin
{
    public class GetUserDTO
    {

        public int Id { get; set; }

        public string Email { get; set; }


        public string Name { get; set; }

        public string Surname { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public Roles Role { get; set; }

        public bool IsActive { get; set; }
        public bool IsLocked { get; set; }

    }
}
