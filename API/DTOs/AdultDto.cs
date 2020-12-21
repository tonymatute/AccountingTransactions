﻿using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AdultDto
    {
        public int AdultId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? RechartedDate { get; set; }
        public bool Active { get; set; }
        public DateTime? ActiveSinceDatetime { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public DateTime Created { get; set; }
        public int PositionId { get; set; }

    }
}
