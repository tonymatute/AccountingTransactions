using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Leadership")]
    public class Leadership
    {
        [Key]  
        public int LeadershipId { get; set; }
        public string Name { get; set; }        

       public ICollection<AdultLeadership> AdultLeaderships { get; set; }      

    }
}
