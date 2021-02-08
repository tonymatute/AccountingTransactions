using System;

namespace API.DTOs
{
    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public DateTime TransactionDate { get; set; }
        public string CheckNumber { get; set; }
        public decimal TransactionCredit { get; set; }
        public decimal TransactionDebit { get; set; }
        public string Comments { get; set; }
        public bool Reconciliated { get; set; }
        public DateTime Created { get; set; }       
        public string TransactionTypeName { get; set; }       
        public string ActivityTypeName { get; set; }
        public double? ActivityTypeCost { get; set; }
        public string ActivityTypeLocation { get; set; }

    }
}
