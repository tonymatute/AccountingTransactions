using System;

namespace API.DTOs
{
    public class RankDto
    {
        public int Id { get; set; }
        public int RankId { get; set; }
        public string RankName { get; set; }
        public bool ActiveRank { get; set; }
        public DateTime Created { get; set; }
    }
}
