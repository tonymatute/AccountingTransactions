
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _contex;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(DataContext contex, ITokenService tokenService, IMapper mapper)
        {
            _contex = contex;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>>Register (RegisterDto registerDto)
        {            
            if (await UserExists(registerDto.Username)) return BadRequest("Username already taken!");

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PassworSalt = hmac.Key;           

            _contex.Users.Add(user);
            await _contex.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                LastName = user.LastName,
                FirstName = user.FirstName,
                Created = user.Created
            };           
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>>Login(LoginDto loginDto)
        {
            var user = await _contex.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("Invalid Username!");

            using var hmac = new HMACSHA512(user.PassworSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i =0;i< computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password!");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                LastName = user.LastName,
                FirstName = user.FirstName,
                Created = user.Created
            };
        }


        private async Task<bool>UserExists(string username)
        {
            return await _contex.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
