using API.DTOs;
using API.Entities;
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
    public class AdultRepository : IAdultRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AdultRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PageList<AdultDto>> GetAdultsAsync(AdultParams adultParams)
        {
            var test = _context.Adults.ToList();
            
            
            var query = _context.Adults.AsQueryable();
            if (adultParams.LastName?.Length > 0)
                query = query.Where(s => s.LastName.Contains(adultParams.LastName));

            if (adultParams.FirstName?.Length > 0)
                query = query.Where(s => s.FirstName.Contains(adultParams.FirstName));

           // query = query.Where(s => s.Active == adultParams.Active);

            query = adultParams.OrderBy switch
            {
                "lastname" => query.OrderBy(o => o.LastName).ThenBy(o => o.FirstName),
                _ => query.OrderBy(o => o.FirstName)
            };

            var adults = await PageList<AdultDto>.CreateAsync(
                           query.ProjectTo<AdultDto>(_mapper.ConfigurationProvider)
                           .AsNoTracking(),
                           adultParams.PageNumber,
                           adultParams.PageSize);           
            return adults;
        }


        public async Task<AdultDto> GetAdultAsync(int id)
        {
            var adult = await _context.Adults
               .ProjectTo<AdultDto>(_mapper.ConfigurationProvider)
               .AsNoTracking()
               .FirstOrDefaultAsync(a => a.AdultId == id);          

            return adult;
        }

        public void Update(Adult adult)
        {
            _context.Entry(adult).State = EntityState.Modified;
        }

    }
}
