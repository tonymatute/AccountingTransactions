using System;

namespace API.Helpers
{
    public class TransactionParams
    {
        public int TransactionId { get; set; }
        public int TransactionTypeId { get; set; }
        public int ActivityTypeId { get; set; }
        public decimal TransactionCredit { get; set; }
        public decimal TransactionDebit { get; set; }
        public string CheckNumber { get; set; }
        public DateTime TransactionDate { get; set; }        
        public string Comments { get; set; }

    }
}
