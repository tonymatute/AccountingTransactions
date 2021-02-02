using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class TroopTrackMember
    {
        public class RootObject
        {
            [JsonProperty("users")]
            public List<User> Members { get; set; }
        }
        public class User
        {
            public int user_id { get; set; }
            public string first_name { get; set; }
            public string last_name { get; set; }
            public string email { get; set; }
            public string cell_phone { get; set; }
            public string gender { get; set; }
            public bool scout { get; set; }
            public string current_position { get; set; }
            public string current_rank { get; set; }
            public string avatar { get; set; }
            public string patrol { get; set; }
            public int patrol_id { get; set; }
            public int troop_number { get; set; }
            public DateTime? born_on { get; set; }
        }
    }
}
