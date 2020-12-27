namespace API.Helpers
{
    public class ScoutParams : PaginationParams
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public int PatrolId { get; set; } 
        public bool Active { get; set; }
        public string OrderBy { get; set; } = "Name";
    }
}
