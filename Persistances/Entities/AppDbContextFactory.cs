using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Persistances.Entities
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            // Build configuration manually
            //IConfigurationRoot configuration = new ConfigurationBuilder()
            //    .SetBasePath(Directory.GetCurrentDirectory()) // Ensures CLI can find appsettings.json
            //    .AddJsonFile("appsettings.json")
            //    .Build();

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            //var connectionString = configuration.GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=ActivityDb;Trusted_Connection=True;TrustServerCertificate=True");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
