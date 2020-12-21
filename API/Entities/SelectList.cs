using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("SelectList")]
    public class SelectList
    {       
        public int Id { get; set; }
        [MaxLength(200)]
        public string ListType { get; set; }
        [MaxLength(100)]
        public string Display { get; set; }

    }
}
