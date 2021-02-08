using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Transactions")]
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        public DateTime TransactionDate { get; set; }
        public string CheckNumber { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransactionCredit { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransactionDebit { get; set; }
        public string Comments { get; set; }
        public bool Reconciliated { get; set; }
        public DateTime Created { get; set; }       
        public string TransactionTypeName { get; set; }     
        public string ActivityTypeName { get; set; }
        public double? ActivityTypeCost { get; set; }
        public string ActivityTypeLocation { get; set; }

        public Member Member { get; set; }

    }
}