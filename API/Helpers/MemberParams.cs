namespace API.Helpers
{
    public enum eMemberType
    {
        Scout = 0,
        Adult = 1,
        AgeScout = 2
    };
    public class MemberParams : PaginationParams
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public int PatrolId { get; set; }
        public string OrderBy { get; set; } = "Name";
        public eMemberType MemberType { get; set; } 
    }
}
