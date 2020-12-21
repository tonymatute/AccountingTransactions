using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Controllers
{
    [Authorize]
    public class ScoutController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public ScoutController(DataContext context ,IUnitOfWork unitOfWork, IMapper mapper)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        [HttpGet("scout-list")]
        public async Task<ActionResult<List<ScoutDto>>> GetScoutLists()
        {
            return await _context.Scouts
               .Include(t => t.Transactions)
               .ProjectTo<ScoutDto>(_mapper.ConfigurationProvider)
               .AsNoTracking()
               .ToListAsync();
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScoutDto>>> GetScouts([FromQuery] SearchParams searchParams)
        {
            var users = await _unitOfWork.scoutRepository.GetScoutsAsync(searchParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [HttpGet("{id}", Name = "GetScout")]
        public async Task<ActionResult<ScoutDto>> GetScout(int id)
        {
            return await _unitOfWork.scoutRepository.GetScoutAsync(id);
        }

        [HttpGet("lookup")]
        public async Task<ActionResult<List<SelectList>>> GetLookUpTable()
        {
            return await _unitOfWork.scoutRepository.GetLookupTableAsync();
        }

    }
}
