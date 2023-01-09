using System.ComponentModel.DataAnnotations;

namespace server.Models
{
	public class User
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "First Name is required.")]
		[MaxLength(30, ErrorMessage = "Maximum length is 30 characters.")]
		public string? FirstName { get; set; }

		[Required(ErrorMessage = "Last Name is required.")]
		[MaxLength(30, ErrorMessage = "Maximum length is 30 characters.")]
		public string? LastName { get; set; }

		[Required(ErrorMessage = "Email is required")]
		public string? Email { get; set; }

		public byte[] PasswordHash { get; set; }

		public byte[] PasswordSalt { get; set; }
		
		public string RefreshToken { get; set; } = string.Empty;

		public DateTime TokenCreated { get; set; }
	
		public DateTime TokenExpires { get; set; }
	}
}
