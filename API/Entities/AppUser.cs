using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PassworSalt { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime  LastActiveDateTime { get; set; } = DateTime.UtcNow;
        public DateTime Created { get; set; } = DateTime.UtcNow;

    }
}
