﻿using API.Extentions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    [Table("Scout")]
    public class Scout
    { 
        [Key]
        public int MemberId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime RechartedDate { get; set; }
        public bool Active { get; set; }
        public DateTime ActiveSinceDatetime { get; set; }
        public string Photo { get; set; }
        public string PublicId { get; set; }
        public int Rank { get; set; }
        public string PatrolName { get; set; }
        public DateTime Created{ get; set; }
       
        public ICollection<Transaction>Transactions{ get; set; }

       
    }
}
