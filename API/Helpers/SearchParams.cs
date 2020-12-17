using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class SearchParams : PaginationParams
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PatrolName { get; set; }

        public string OrderBy { get; set; } = "Name";
    }
}
