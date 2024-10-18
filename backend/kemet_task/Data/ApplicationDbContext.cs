// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using kemet_task.Models;

namespace kemet_task.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
