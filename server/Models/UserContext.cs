using Microsoft.EntityFrameworkCore;

namespace server.Models
{
	public class UserContext : DbContext
	{
		public UserContext(DbContextOptions<UserContext> options) : base(options) 
		{ 

		}
		public DbSet<User> Users => Set<User>();
	}
}
