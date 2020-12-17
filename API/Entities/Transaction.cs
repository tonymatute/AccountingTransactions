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
        public int TransactionType { get; set; }
        public int TransactionSubType { get; set; }
        public int TransactionFrom { get; set; }
        public int ActivityId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransactionCredit { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransactionDebit { get; set; }
        public string CheckNumber { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public bool Reconciliated { get; set; }
      
           
    }
}