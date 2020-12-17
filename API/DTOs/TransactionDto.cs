using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public int TransactionType { get; set; }
        public int TransactionSubType { get; set; }
        public int TransactionFrom { get; set; }
        public int ActivityId { get; set; }        
        public decimal TransactionCredit { get; set; }       
        public decimal TransactionDebit { get; set; }
        public string CheckNumber { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public bool Reconciliated { get; set; }
        public Scout Scout { get; set; }
    }
}
