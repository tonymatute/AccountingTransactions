using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime  LastActiveDateTime { get; set; } = DateTime.UtcNow;
        public DateTime Created { get; set; } = DateTime.UtcNow;

        public ICollection<AppUserRole> UserRoles { get; set; }
    }

}
