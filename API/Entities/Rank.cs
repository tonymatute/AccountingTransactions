﻿using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Rank
    {
        [Key]
        public int Id { get; set; }
        public int RankId { get; set; }
        [MaxLength(100)]
        public string  RankName { get; set; }
        public bool ActiveRank { get; set; }
        public DateTime RankDateTime { get; set; }
        public Scout Scout { get; set; }
       
    }
}
