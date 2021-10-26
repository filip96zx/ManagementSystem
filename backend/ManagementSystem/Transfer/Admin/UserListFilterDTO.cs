using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ManagementSystem.Models.User;

namespace ManagementSystem.Transfer.Admin
{
    public class UserListFilterDTO
    {

        public string Name { get; set; }

        public string Surname { get; set; }

        public Roles? Role { get; set; }

        public string Sort { get; set; }
        public bool? SortDesc { get; set; }

    }
}
