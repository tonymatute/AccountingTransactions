using System;

namespace API.Helpers
{
    public class RankParams
    {
        public int RankId { get; set; }
        public bool ActiveRank { get; set; }
        public string RankName { get; set; }
        public DateTime Created { get; set; }
    }
}
