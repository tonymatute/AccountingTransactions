﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime  LastActiveDateTime { get; set; } = DateTime.Now;
        public DateTime Created { get; set; } = DateTime.Now;

        public ICollection<AppUserRole> UserRoles { get; set; }
    }

}
