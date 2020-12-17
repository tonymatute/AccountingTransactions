using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public string Photo { get; set; }
        public string PublicId { get; set; }
        public int Rank { get; set; }
        public string PatrolName { get; set; }
        public DateTime Created { get; set; }

        public ICollection<TransactionDto> Transactions { get; set; }
    }
}
