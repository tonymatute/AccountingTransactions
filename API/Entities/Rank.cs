using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Rank
    {
        [Key]      
        public int RankId { get; set; }
        [MaxLength(100)]
        public string  RankName { get; set; }

        public ICollection<ScoutRank> ScoutRanks { get; set; }

    }
}
