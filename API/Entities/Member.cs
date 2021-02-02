using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Member")]
    public class Member
    {
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string CellPhone { get; set; }
        public string Gender { get; set; }
        public bool Scout { get; set; }
        public string CurrentPosition { get; set; }
        public string CurrentRank { get; set; }
        public string Photo { get; set; }
        public string Patrol { get; set; }
        public int PatrolId { get; set; }
        public int TroopNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? RechartedDate { get; set; }

        public ICollection<Transaction> Transactions { get; set; }
    }
}
