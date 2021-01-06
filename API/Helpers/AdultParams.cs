namespace API.Helpers
{
    public class AdultParams :  PaginationParams
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public bool Active { get; set; }
        public string OrderBy { get; set; } = "lastname";
    }
}
