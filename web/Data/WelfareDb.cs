using Microsoft.EntityFrameworkCore;
using web.Models;

namespace web.Data
{
    public class WelfareDb : DbContext
    {
      
    public WelfareDb (DbContextOptions<WelfareDb> options) : base (options)         
            { 
            }
        public DbSet<NGOsLogin> NGOsLogins { get; set; }
        public DbSet<UserLoginConfidentials> UserLoginConfidentials { get; set; }
        public DbSet<AdminLogin> AdminLogins { get; set; }
    }
}
