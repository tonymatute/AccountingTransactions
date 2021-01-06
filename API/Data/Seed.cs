using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {

        public static async Task SeedTables(
            UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, DataContext context)
        {
            await Seed.SeedUsers(userManager, roleManager);
            await Seed.SeedLookUpTable(context);
            await Seed.SeedScouts(context);
            await Seed.SeedLeadership(context);
            await Seed.SeedRanks(context);
        }
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
                    FirstName = "Admin"
                    
                };

                admin.EmailConfirmed = true;
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

        public static async Task SeedLeadership(DataContext context)
        {

            if (await context.Leaderships.AnyAsync()) return;
            var data = await File.ReadAllTextAsync("Data/leadership.json");
            var leaderships = JsonSerializer.Deserialize<List<Leadership>>(data);
            foreach (var leadership in leaderships)
            {
                context.Leaderships.Add(leadership);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedRanks(DataContext context)
        {

           // Thread.Sleep(6000);
            if (await context.Ranks.AnyAsync()) return;
            var data = await File.ReadAllTextAsync("Data/ranks.json");
            var ranks = JsonSerializer.Deserialize<List<Rank>>(data);
            foreach (var rank in ranks)
            {
                context.Ranks.Add(rank);
            }

            await context.SaveChangesAsync();
        }

    }


}

