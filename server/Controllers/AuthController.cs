using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Dtos;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		public static User user = new User();
		private readonly IConfiguration configuration;

		public AuthController(IConfiguration configuration)
		{
			this.configuration = configuration;
		}

		[HttpPost("register")]
		public async Task<ActionResult<User>> Register(SignupRequestDto request)
		{
			CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

			//set user password hash to password hash
			user.FirstName = request.FirstName;
			user.LastName = request.LastName;
			user.Email = request.Email;
			user.PasswordHash = passwordHash;
			user.PasswordSalt = passwordSalt;

			return Ok(user);
		}

		[HttpPost("login")]
		public async Task<ActionResult<string>> Login(LoginRequestDto request)
		{
			if (user.Email != request.Email)
			{
				return BadRequest("User not found");
			}

			if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
			{
				return BadRequest("Incorrect password!!");
			}

			//create JWT token
			string token = CreateJwtToken(user);
			return Ok(token);

		}

		private string CreateJwtToken(User user)
		{
			List<Claim> claims = new List<Claim>
			{
				new Claim(ClaimTypes.Email, user.Email),
			};

			var Key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
				configuration.GetSection("AppSettings:Token").Value));

			//create credentials
			var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha512Signature);

			var token = new JwtSecurityToken(
				claims: claims,
				expires: DateTime.Now.AddDays(1),
				signingCredentials: creds
				);

			var jwt = new JwtSecurityTokenHandler().WriteToken(token);

			return jwt;
		}

		//create password hash method
		private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (HMACSHA512 hmac = new HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}

		//verify password
		private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
		{
			using (HMACSHA512 hmac = new HMACSHA512(passwordSalt))
			{
				var ComputedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				return ComputedHash.SequenceEqual(passwordHash);
			}
		}
	}
}
