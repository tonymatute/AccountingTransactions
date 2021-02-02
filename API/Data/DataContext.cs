using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace API.Data
{
    public class DataContext : IdentityDbContext<
        AppUser,
        AppRole, int,
        IdentityUserClaim<int>,
        AppUserRole,
        IdentityUserLogin<int>,
        IdentityRoleClaim<int>,
        IdentityUserToken<int>
        >
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Member> Member { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        //public DbSet<Scout> Scouts { get; set; }
        public DbSet<SelectList> SelectList { get; set; }
       

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Role to AppRole FK
            builder.Entity<AppUser>()
                  .HasMany(ur => ur.UserRoles)
                  .WithOne(u => u.User)
                  .HasForeignKey(ur => ur.UserId)
                  .IsRequired();
            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            //// Adult to Leadership FK
            //builder.Entity<AdultLeadership>().HasKey(al => new { al.AdultId, al.LeadershipId });
            //builder.Entity<Adult>()
            //     .HasMany(al => al.AdultLeaderships)
            //     .WithOne(a => a.Adults)
            //     .HasForeignKey(a => a.AdultId)
            //     .IsRequired();
            //builder.Entity<Leadership>()
            //   .HasMany(al => al.AdultLeaderships)
            //   .WithOne(l => l.Leaderships)
            //   .HasForeignKey(l => l.LeadershipId)
            //   .IsRequired();

            //// Scout to Rank FK
            //builder.Entity<ScoutRank>().HasKey(sr => new { sr.ScoutId, sr.RankId });
            //builder.Entity<Rank>()
            //    .HasMany(sr => sr.ScoutRanks)
            //    .WithOne(r => r.Ranks)
            //    .HasForeignKey(fk => fk.RankId)
            //    .IsRequired();
            //builder.Entity<Scout>()
            //    .HasMany(sr => sr.ScoutRanks)
            //    .WithOne(r => r.Scouts)
            //    .HasForeignKey(fk => fk.ScoutId)
            //    .IsRequired();

        }

    }

    public static class UtcDateAnnotation
    {
        private const String IsUtcAnnotation = "IsUtc";
        private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
          new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
          new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

        public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
          builder.HasAnnotation(IsUtcAnnotation, isUtc);

        public static Boolean IsUtc(this IMutableProperty property) =>
          ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

        /// <summary>
        /// Make sure this is called after configuring all your entities.
        /// </summary>
        public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
        {
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (!property.IsUtc())
                    {
                        continue;
                    }

                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(UtcConverter);
                    }

                    if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(UtcNullableConverter);
                    }
                }
            }
        }
    }
}



