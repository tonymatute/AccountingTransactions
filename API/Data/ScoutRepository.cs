using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ScoutRepository : IScoutRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ScoutRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ScoutDto> GetScoutAsync(int id)
        {
            return await _context.Scouts
               .Include(t => t.Transactions)
               .ProjectTo<ScoutDto>(_mapper.ConfigurationProvider)
               .AsNoTracking()
               .FirstOrDefaultAsync(s => s.MemberId == id);

        }

        public async Task<PageList<ScoutDto>> GetScoutsAsync(SearchParams searchParams)
        {
            var query = _context.Scouts.AsQueryable();
            if (searchParams.LastName?.Length > 0)
                query = query.Where(s => s.LastName == searchParams.LastName);

            if (searchParams.FirstName?.Length == 0)
                query = query.Where(s => s.FirstName == searchParams.FirstName);

            if (searchParams.PatrolName?.Length > 0)
                query = query.Where(s => s.PatrolName == searchParams.PatrolName);

            query = searchParams.OrderBy switch
            {
                "Name" => query.OrderBy(o => o.LastName).ThenBy(o => o.FirstName),
                _ => query.OrderBy(o => o.PatrolName).ThenBy(o => o.LastName)
            };

            return await PageList<ScoutDto>.CreateAsync(
                           query.ProjectTo<ScoutDto>(_mapper.ConfigurationProvider)
                           .AsNoTracking(),
                           searchParams.PageNumber,
                           searchParams.PageSize);
        }
    }
}
