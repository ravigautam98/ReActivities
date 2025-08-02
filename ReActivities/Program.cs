using Microsoft.EntityFrameworkCore;
using Persistances.Entities;

namespace ReActivities
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // Vite default
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseCors("AllowReactApp");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
