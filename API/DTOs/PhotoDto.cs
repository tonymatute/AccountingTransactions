using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PhotoDto
    {
        public int MemberId { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
    }
}
