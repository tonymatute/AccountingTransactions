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

            SetTransactionType(scout);
            SetPatrolName(scout);
            SetActivity(scout);

            return scout;
        }

        public async Task<Scout> FindScoutByIdAsync(int id)
        {
            return await _context.Scouts
                .Include(t => t.Transactions)
                .Include(b => b.BuckTransactions)
                .Include(p => p.Parents)
                .Include(r => r.Ranks)              
               .FirstOrDefaultAsync(s => s.MemberId == id);
        }

        public async Task<Rank> FindActiveRankByIdAsync(int id)
        {
            return await _context.Ranks
               .FirstOrDefaultAsync(r => r.Scout.MemberId == id && r.ActiveRank == true);
        }

        public async Task<Scout> FindScoutByPublicIdAsync(string PublicId)
        {
            return await _context.Scouts
                .Include(t => t.Transactions)
                .Include(b => b.BuckTransactions)
                .Include(p => p.Parents)
                .Include(r => r.Ranks)               
               .FirstOrDefaultAsync(s => s.PublicId == PublicId);
        }

        public async Task<PageList<ScoutDto>> GetScoutsAsync(ScoutParams scoutParams)
        {
            var query = _context.Scouts.AsQueryable();
            if (scoutParams.LastName?.Length > 0)
                query = query.Where(s => s.LastName.Contains(scoutParams.LastName));

            if (scoutParams.FirstName?.Length > 0)
                query = query.Where(s => s.FirstName.Contains(scoutParams.FirstName));

            if (scoutParams.PatrolId > 0)
                query = query.Where(s => s.PatrolId == scoutParams.PatrolId);

            query = query.Where(s => s.Active == scoutParams.Active);

            query = scoutParams.OrderBy switch
            {
                "name" => query.OrderBy(o => o.LastName).ThenBy(o => o.FirstName),
                _ => query.OrderBy(o => o.PatrolId).ThenBy(o => o.LastName)
            };

            var scouts = await PageList<ScoutDto>.CreateAsync(
                           query.ProjectTo<ScoutDto>(_mapper.ConfigurationProvider)
                           .AsNoTracking(),
                           scoutParams.PageNumber,
                           scoutParams.PageSize);

            foreach (var scout in scouts)
            {
                SetTransactionType(scout);
                SetPatrolName(scout);
                SetActivity(scout);
            }
            return scouts;
        }

        public async Task<List<SelectList>> GetListTypesAsync(string listType)
        {
            return  await _context.SelectList
                .Where(s => s.ListType == listType)
               .AsNoTracking()
               .ToListAsync();
        }


        public List<SelectList> GetListTypes(string listType)
        {
            return  _context.SelectList
                .Where(s => s.ListType == listType)
               .AsNoTracking()
               .ToList();
        }      

        private void SetTransactionType(ScoutDto scout)
        {
            foreach (var row in GetListTypes("Transaction Type"))
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

        private void SetPatrolName(ScoutDto scout)
        {
            foreach (var row in GetListTypes("Patrol"))
            {
                if (scout.PatrolId == row.Id)
                {
                    scout.PatrolName = row.Display;

                }
            }
        }
        private void SetActivity(ScoutDto scout)
        {
            foreach (var row in GetListTypes("Activity"))
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

        public void Update(Scout scout)
        {
            _context.Entry(scout).State = EntityState.Modified;
        }

        public void UpdateRank(Rank rank)
        {
            _context.Entry(rank).State = EntityState.Modified;
        }


        public string SelectRankNameByID(int id)        {
            return _context.SelectList
               .AsNoTracking()
               .FirstOrDefault(s => s.Id == id).Display;               
        }

        public void UpdateActiveRank(int scoutId)
        {


        }



    }
}
