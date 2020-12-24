﻿using System;

namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime LastActiveDateTime { get; set; } 
        public DateTime Created { get; set; } 
    }
}
