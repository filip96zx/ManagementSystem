using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Models
{
    class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Pesel { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Role { get; set; }

    }
}
