using System.ComponentModel.DataAnnotations;

namespace server.Dtos
{
	public class SignupRequestDto
	{

		[Required(ErrorMessage = "First Name is required.")]
		[MaxLength(30, ErrorMessage = "Maximum length is 30 characters.")]
		[MinLength(5, ErrorMessage = "Minimum length is 5 characters.")]
		public string? FirstName { get; set; }

		[Required(ErrorMessage = "Last Name is required.")]
		[MaxLength(30, ErrorMessage = "Maximum length is 30 characters.")]
		public string? LastName { get; set; }

		[Required(ErrorMessage = "Email is required")]
		public string? Email { get; set; } = null;

		public string? Password { get; set; }
	}
}
