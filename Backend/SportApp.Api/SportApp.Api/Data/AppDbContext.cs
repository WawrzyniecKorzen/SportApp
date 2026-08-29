using Microsoft.EntityFrameworkCore;
using SportApp.Api.Models;

namespace SportApp.Api.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Training> Trainings { get; set; }

       //recznie buduje relacje miedzy User i Training (choc powinno sie tez zrobic automatycznie)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Training>()
                .HasOne(t => t.User)
                .WithMany(u => u.Trainings)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
