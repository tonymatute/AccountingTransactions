using System;

namespace API.DTOs
{
    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public int TransactionTypeId { get; set; }
        public string TransactionType { get; set; }
        public int ActivityId { get; set; }
        public string Activity { get; set; }
        public decimal TransactionCredit { get; set; }       
        public decimal TransactionDebit { get; set; }
        public int CheckNumber { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public bool Reconciliated { get; set; }
       
    }
}
