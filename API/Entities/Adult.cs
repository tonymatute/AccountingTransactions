using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Adult")]
    public class Adult
    {
        public int AdultId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }       
        public DateTime? RechartedDate { get; set; }
        public bool Active { get; set; }
        public DateTime? ActiveSinceDatetime { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }       
        public DateTime Created { get; set; }

        public Scout Scout { get; set; }
    }
}
