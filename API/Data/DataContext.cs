using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<SaleOffer> SaleOffers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(x => x.SaleOffers)
                .WithOne(u => u.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired();
        }

    }
}

