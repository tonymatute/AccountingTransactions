using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedScouts (DataContext context)
        {
            if (!await context.Users.AnyAsync())
            {
                using var hmac = new HMACSHA512();
                var admin = new AppUser
                {
                    UserName = "admin",
                    LastName = "Admin",
                    FirstName = "Admin",
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PassworSalt = hmac.Key
                };
                context.Users.Add(admin);
            }            
            
            if (await context.Scouts.AnyAsync()) return;
            var scoutData = await File.ReadAllTextAsync("Data/ScoutSeedData.json");
            var scouts = JsonSerializer.Deserialize <List<Scout>>(scoutData);
            foreach(var scout in scouts)
            {
                context.Scouts.Add(scout);              
            }

            await context.SaveChangesAsync();
        }


        public static async Task SeedLookUpTable(DataContext context)
        {
           
            if (await context.SelectList.AnyAsync()) return;
            var data = await File.ReadAllTextAsync("Data/LookupTable.json");
            var looupList= JsonSerializer.Deserialize<List<SelectList>>(data);
            foreach (var row in looupList)
            {
                context.SelectList.Add(row);
            }

            await context.SaveChangesAsync();
        }       


    }

    
}

