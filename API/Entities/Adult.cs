using API.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Adult")]
    public class Adult
    {
        [Key]        
        public int AdultId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }       
        public DateTime? RechartedDate { get; set; }
        public bool Active { get; set; }
        public DateTime? ActiveSinceDatetime { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;

        public Scout Scout { get; set; }
        public ICollection<AdultLeadership> AdultLeaderships { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}
