﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Transactions")]
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        
        public int TransactionTypeId { get; set; }
        public int ActivityId { get; set; } = 0;
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransactionCredit { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransactionDebit { get; set; }
        public int? CheckNumber { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public bool Reconciliated { get; set; }
        
        public Scout Scout { get; set; }
               
    }
}