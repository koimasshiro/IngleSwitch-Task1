using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
	public class User
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string? FirstName { get; set; }

		[Required]
		public string? LastName { get; set; }

		[Required]
		public string? Email { get; set; }

		public byte[] PasswordHash { get; set; }

		public byte[] PasswordSalt { get; set; }
		
		public string RefreshToken { get; set; } = string.Empty;

		public DateTime TokenCreated { get; set; }
	
		public DateTime TokenExpires { get; set; }
	}
}
