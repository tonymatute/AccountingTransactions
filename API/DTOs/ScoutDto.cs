using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ScoutDto
    {
        public int MemberId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public int Age { get; set; }
        public DateTime RechartedDate { get; set; }
        public bool Active { get; set; }
        public DateTime ActiveSinceDatetime { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public string RankName { get; set; }
        public int PatrolId { get; set; }
        public string PatrolName { get; set; }
        public DateTime Created { get; set; }

        public ICollection<TransactionDto> Transactions { get; set; }
        public ICollection<BuckTransactionDto> BuckTransactions { get; set; }
        public ICollection<AdultDto> Parents { get; set; }
        public ICollection<RankDto> Ranks { get; set; }

    }
}
