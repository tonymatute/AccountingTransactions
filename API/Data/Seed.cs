using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {            
            if (!await roleManager.Roles.AnyAsync())
            {
                var roles = new List<AppRole>
                {
                    new AppRole{Name = "Admin"},
                    new AppRole{Name = "Operator"},                    
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }            
            
            if (!await userManager.Users.AnyAsync())
            {
                var admin = new AppUser
                {
                    UserName = "admin",
                    LastName = "Admin",
                    FirstName = "Admin",
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin , new[] {"Admin", "Operator"});
            }            

        }

        public static async Task SeedScouts(DataContext context)
        {
            if (await context.Scouts.AnyAsync()) return;
            var scoutData = await File.ReadAllTextAsync("Data/ScoutSeedData.json");
            var scouts = JsonSerializer.Deserialize<List<Scout>>(scoutData);
            foreach (var scout in scouts)
            {
                context.Scouts.Add(scout);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedLookUpTable(DataContext context)
        {

            if (await context.SelectList.AnyAsync()) return;
            var data = await File.ReadAllTextAsync("Data/LookupTable.json");
            var looupList = JsonSerializer.Deserialize<List<SelectList>>(data);
            foreach (var row in looupList)
            {
                context.SelectList.Add(row);
            }

            await context.SaveChangesAsync();
        }


    }


}

