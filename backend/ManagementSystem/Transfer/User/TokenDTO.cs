using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ManagementSystem.Transfer.User
{
    public class TokenDTO 
    {
        public enum LoginResults { Ok, WrongData, IsLocked};
        
        public string Token { get; set; }
        public string LoginResult{ get; set; }
    }
}
