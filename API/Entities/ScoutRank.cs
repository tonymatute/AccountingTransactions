using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ScoutRank
    {
        public int ScoutId { get; set; }
        public int RankId { get; set; }
        [MaxLength(100)]
        public string RankName { get; set; }
        public bool ActiveRank { get; set; }
        public DateTime CompletedOn { get; set; } = DateTime.Now;

        public Rank Ranks { get; set; }
        public Scout Scouts { get; set; }


    }
}
