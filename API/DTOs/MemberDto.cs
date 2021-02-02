using System;
using System.Collections.Generic;
using System.Transactions;

namespace API.DTOs
{
    public class MemberDto
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
        public int Age { get; set; }
        public DateTime? RechartedDate { get; set; }

        public ICollection<TransactionDto> Transactions { get; set; }
    }
}

