using System;

namespace API.DTOs
{
    public class ScoutUpdateDto
    {
        public int MemberId { get; set; }
        public DateTime RechartedDate { get; set; }
        public bool Active { get; set; }
        public DateTime ActiveSinceDatetime { get; set; }
        public int PatrolId { get; set; }
    }
        
}
