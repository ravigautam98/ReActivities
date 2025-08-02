using Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistances.Entities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Activity> Activities { get; set; }
    }
}
