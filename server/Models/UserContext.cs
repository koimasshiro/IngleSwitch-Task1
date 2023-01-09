using Microsoft.EntityFrameworkCore;

namespace server.Models
{
	public class UserContext : DbContext
	{
		public DbSet<User> Users { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite(@"Data Source=C:\Sqlite Database Task\ApiTask");

	}
}
