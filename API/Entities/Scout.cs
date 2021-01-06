using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public int PatrolId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;

        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<BuckTransaction> BuckTransactions { get; set; }
        public ICollection<Adult> Parents { get; set; }
        public ICollection<ScoutRank> ScoutRanks { get; set; }
    }
}
