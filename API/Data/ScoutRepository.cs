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
            var scout = await _context.Scouts
               .ProjectTo<ScoutDto>(_mapper.ConfigurationProvider)
               .AsNoTracking()
               .FirstOrDefaultAsync(s => s.MemberId == id);

            setTransactionType(scout);
            setPatrolName(scout);
            setActivity(scout);
            return scout;

        }

        public async Task<PageList<ScoutDto>> GetScoutsAsync(SearchParams searchParams)
        {
            var query = _context.Scouts.AsQueryable();
            if (searchParams.LastName?.Length > 0)
                query = query.Where(s => s.LastName == searchParams.LastName);

            if (searchParams.FirstName?.Length == 0)
                query = query.Where(s => s.FirstName == searchParams.FirstName);

            if (searchParams.PatrolId > 0)
                query = query.Where(s => s.PatrolId == searchParams.PatrolId);

            query = searchParams.OrderBy switch
            {
                "Name" => query.OrderBy(o => o.LastName).ThenBy(o => o.FirstName),
                _ => query.OrderBy(o => o.PatrolId).ThenBy(o => o.LastName)
            };

            return await PageList<ScoutDto>.CreateAsync(
                           query.ProjectTo<ScoutDto>(_mapper.ConfigurationProvider)
                           .AsNoTracking(),
                           searchParams.PageNumber,
                           searchParams.PageSize);
        }


        public async Task<List<SelectList>> GetLookupTableAsync()
        {
            return await _context.SelectList
               .AsNoTracking()
               .ToListAsync();
        }


        private void setTransactionType(ScoutDto scout)
        {
            foreach (var row in _context.SelectList)
            {
                foreach (var transaction in scout.Transactions)
                {
                    if (transaction.TransactionTypeId == row.Id)
                    {
                        transaction.TransactionType = row.Display;
                    }
                }

                foreach (var transaction in scout.BuckTransactions)
                {
                    if (transaction.TransactionTypeId == row.Id)
                    {
                        transaction.TransactionType = row.Display;
                    }
                }
            }
        }

        private void setPatrolName(ScoutDto scout)
        {
            foreach (var row in _context.SelectList)
            {
                if (scout.PatrolId == row.Id)
                {
                    scout.PatrolName = row.Display;

                }
            }
        }
        private void setActivity(ScoutDto scout)
        {
            foreach (var row in _context.SelectList)
            {
                foreach (var transaction in scout.Transactions)
                {
                    if (transaction.ActivityId == row.Id)
                    {
                        transaction.Activity = row.Display;
                    }
                }
                foreach (var transaction in scout.BuckTransactions)
                {
                    if (transaction.ActivityId == row.Id)
                    {
                        transaction.Activity = row.Display;
                    }
                }
            }
        }
    }
}
