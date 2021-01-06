using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("AdultLeadership")]
    public class AdultLeadership
    {
        public int AdultId { get; set; }
        
        public int LeadershipId { get; set; }

        public Adult Adults { get; set; }

        public Leadership Leaderships { get; set; }

    }
}
