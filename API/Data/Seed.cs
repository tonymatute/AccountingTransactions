using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using static API.Entities.TroopTrackMember;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedTables(
            UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, DataContext context)
        {
            await Seed.SeedUsers(userManager, roleManager);
            await Seed.SeedExpenseType(context);
            await Seed.SeedActivityType(context);
            await Seed.SeedTransactionType(context);
            await Seed.SeedMembers(context);

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
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Operator" });
            }

        }
        public static async Task SeedMembers(DataContext context)
        {
            if (await context.Member.AnyAsync()) return;

            var memberTroop = new Member
            {
                MemberId = 1,
                LastName = "Troop",
                FirstName ="Admin",
                Scout = false,
                PatrolId = 0,
                Patrol = "Admin",
                TroopNumber = 425
                
                
            };
            context.Member.Add(memberTroop);
            await context.SaveChangesAsync();

            using var client = new TroopTrackAPI();
            var response = await client.ApiClient.GetAsync("api/v1/users");
            if (response.IsSuccessStatusCode)
            {
                RootObject rootObject = await response.Content.ReadAsAsync<RootObject>();
                foreach (var user in rootObject.Members)
                {
                    var member = new Member
                    {
                        MemberId = user.user_id,
                        LastName = user.last_name,
                        FirstName = user.first_name,
                        Email = user.email,
                        CellPhone = user.cell_phone,
                        Gender = user.gender,
                        Scout = user.scout,
                        CurrentPosition = user.current_position,
                        CurrentRank = user.current_rank,
                        PhotoUrl = user.avatar,
                        Patrol = user.patrol,
                        PatrolId = user.patrol_id,
                        TroopNumber = user.troop_number,
                        DateOfBirth = user.born_on
                    };
                    context.Member.Add(member);
                }
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedExpenseType(DataContext context)
        {
            if (await context.ExpenseTypes.AnyAsync()) return;
            var data = await File.ReadAllTextAsync("Data/SeedData/expenseType.json");
            var expenseTypes = JsonSerializer.Deserialize<List<ExpenseType>>(data);
            foreach (var expenseType in expenseTypes)
            {
                context.ExpenseTypes.Add(expenseType);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedActivityType(DataContext context)
        {
            if (await context.ActivityTypes.AnyAsync()) return;
            var data = await File.ReadAllTextAsync("Data/SeedData/activityType.json");
            var activityTypes = JsonSerializer.Deserialize<List<ActivityType>>(data);
            foreach (var activityType in activityTypes)
            {
                context.ActivityTypes.Add(activityType);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedTransactionType(DataContext context)
        {
            if (await context.TransactionTypes.AnyAsync()) return;
            var data = await File.ReadAllTextAsync("Data/SeedData/transactionType.json");
            var transactionTypes = JsonSerializer.Deserialize<List<TransactionType>>(data);
            foreach (var transactionType in transactionTypes)
            {
                context.TransactionTypes.Add(transactionType);
            }

            await context.SaveChangesAsync();
        }

    }


}

