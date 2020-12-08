using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Scout
    { 
        public int ScoutId { get; set; }
        public string Lastname { get; set; }
        public string FirstName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime RechartedDate { get; set; }
        public bool Active { get; set; }
        public DateTime ActiveDatetime { get; set; }
        public byte Photo { get; set; }
        public int Rank { get; set; }
        public string PatrolName { get; set; }
        public DateTime CreatedDatetime { get; set; }

    }
}
