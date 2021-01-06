using System;

namespace API.DTOs
{
    public class ScoutRankDto
    {
        public int ScoutId { get; set; }
        public int RankId { get; set; }
        public string RankName { get; set; }
        public bool ActiveRank { get; set; }
        public DateTime CompletedOn { get; set; } 
    }
}
