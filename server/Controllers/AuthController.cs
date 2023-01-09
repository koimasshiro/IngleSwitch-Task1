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

			//create refresh token
			var refreshToken = GenerateRefreshToken();
			setRefreshToken(refreshToken);

			return Ok(token);

		}
		[HttpPost("refresh-token")]
		public async Task<ActionResult<string>> RefreshToken()
		{
			//get refresh token from the cookie
			var refreshToken = Request.Cookies["refreshToken"];

			//check if everything is okay with refresh token
			if(!user.RefreshToken.Equals(refreshToken))
			{
				return Unauthorized("Invalid refresh token");
			}
			else if (user.TokenExpires < DateTime.Now) 
			{
				return Unauthorized("Token expired");
			}

			//Generate a new JsonWebToken
			string token = CreateJwtToken(user);
			var newRefreshToken = GenerateRefreshToken();

			//set the new refresh token to the cookie
			setRefreshToken(newRefreshToken);

			return Ok(token);
		}

		private RefreshToken GenerateRefreshToken()
		{
			var refreshToken = new RefreshToken
			{
				Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
				Expires = DateTime.Now.AddDays(7),
				Created = DateTime.Now
			};
			return refreshToken;
		}

		private void setRefreshToken(RefreshToken newRefreshToken)
		{
			var cookieOptions = new CookieOptions
			{
				HttpOnly = true,
				Expires = newRefreshToken.Expires,
			};
			Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

			user.RefreshToken = newRefreshToken.Token;
			user.TokenCreated = newRefreshToken.Created;
			user.TokenExpires = newRefreshToken.Expires;
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
