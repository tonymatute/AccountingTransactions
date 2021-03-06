﻿using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static API.Entities.TroopTrackMember;
using System.Net.Http;
using API.Helpers;
using API.DTOs;
using AutoMapper.QueryableExtensions;

namespace API.Data
{
    public class MemberRepository : IMemberRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MemberRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task GetMembersFromTroopTrarckAsync()
        {
            using (var client = new TroopTrackAPI())
            {
                var response = await client.ApiClient.GetAsync("api/v1/users");
                if (response.IsSuccessStatusCode)
                {
                    RootObject rootObject = await response.Content.ReadAsAsync<RootObject>();
                    foreach (var user in rootObject.Members)
                    {
                        var member = new Member
                        {
                            MemberId = user.user_id,
                            LastName = user.last_name,
                            FirstName = user.first_name,
                            Email = user.email,
                            CellPhone = user.cell_phone,
                            Gender = user.gender,
                            Scout = user.scout,
                            CurrentPosition = user.current_position,
                            CurrentRank = user.current_rank,
                            PhotoUrl = user.avatar,
                            Patrol = user.patrol,
                            TroopNumber = user.troop_number,
                            DateOfBirth = user.born_on
                        };
                        _context.Member.Add(member);
                    }
                    await _context.SaveChangesAsync();
                }
            }
        }

        public async Task<MemberDto> GetMemberAsync(int id)
        {
            var member = await _context.Member
               .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
               .AsNoTracking()
               .FirstOrDefaultAsync(member => member.MemberId == id);

            return member;
        }

        public async Task<PageList<MemberDto>> GetMembersAsync(MemberParams memberParams)
        {
            var query = _context.Member.AsQueryable();
            if (memberParams.LastName?.Length > 0)
                query = query.Where(member => member.LastName.ToLower().Contains(memberParams.LastName.ToLower()));

            if (memberParams.FirstName?.Length > 0)
                query = query.Where(member => member.FirstName.ToLower().Contains(memberParams.FirstName.ToLower()));

            if (memberParams.PatrolId > 0)
                query = query.Where(member => member.PatrolId == memberParams.PatrolId);

            switch (memberParams.MemberType)
            {
                case eMemberType.Adult:
                    query = query.Where(member => member.Scout == false);
                    query = query.Where(member => member.PatrolId != 91272);
                    break;
                case eMemberType.AgeScout:
                    query = query.Where(member => member.Scout == false);
                    query = query.Where(member => member.PatrolId == 91272);
                    break;
                default:
                    query = query.Where(member => member.Scout == true);
                    break;
            }

            query = memberParams.OrderBy switch
            {
                "name" => query.OrderBy(member => member.LastName).ThenBy(member => member.FirstName),
                _ => query.OrderBy(member => member.Patrol).ThenBy(member => member.LastName)
            };

            var members = await PageList<MemberDto>.CreateAsync(
                           query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                           .AsNoTracking(),
                           memberParams.PageNumber,
                           memberParams.PageSize);

            return members;
        }

        public async Task<Member> FindMemberByIdAsync(int id)
        {
            return await _context.Member
                .Include(t => t.Transactions)
               .FirstOrDefaultAsync(s => s.MemberId == id);
        }

        public void Update(Member member)
        {
            _context.Entry(member).State = EntityState.Modified;
        }

        public async Task<Member> FindMemberByNameAsync(string lastName, string firstName)
        {
            return await _context.Member
              .FirstOrDefaultAsync(member => member.LastName == lastName && member.FirstName == firstName);
        }

        public List<PatrolDto> GetPatrolList()
        {
            var patrols = _context.Member
                .Select(p => new PatrolDto { Patrol = p.Patrol, PatrolId = p.PatrolId })
                .Distinct()
                .OrderBy(o => o.Patrol);
            return patrols.ToList();
        }

        public List<TransactionTypeDto> GetTransactionTypeList()
        {
            var transactionTypes = _context.TransactionTypes
                .ProjectTo<TransactionTypeDto>(_mapper.ConfigurationProvider)
                .AsNoTracking()
                .OrderBy(t => t.TransactionTypeName)
                .ToList();

            return transactionTypes;
        }

        public List<ActivityTypeDto> GetActivityTypeList()
        {
            var activityTypes = _context.ActivityTypes
                 .ProjectTo<ActivityTypeDto>(_mapper.ConfigurationProvider)
                 .AsNoTracking()
                 .OrderBy(a => a.ActivityTypeName)
                 .ToList();

            return activityTypes;
        }

        public void AddTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
        }

        public TransactionTypeDto FindTransactionTypeById(int transactionTypeId)
        {
            var transactionType = _context.TransactionTypes
                 .ProjectTo<TransactionTypeDto>(_mapper.ConfigurationProvider)
                 .AsNoTracking()
                 .FirstOrDefault(x => x.TransactionTypeId == transactionTypeId);
            return transactionType;
        }

        public ActivityTypeDto FindActivityTypeById(int activityTypeId)
        {
            var activityType = _context.ActivityTypes
                 .ProjectTo<ActivityTypeDto>(_mapper.ConfigurationProvider)
                 .AsNoTracking()
                 .FirstOrDefault(x => x.ActivityTypeId == activityTypeId);

            return activityType;
        }


        public async Task UpdateTroopTrackMembers()
        {
            using var client = new TroopTrackAPI();
            var response = await client.ApiClient.GetAsync("api/v1/users");
            if (response.IsSuccessStatusCode)
            {
                RootObject rootObject = await response.Content.ReadAsAsync<RootObject>();
                foreach (var user in rootObject.Members)
                {
                    var member = await FindMemberByIdAsync(user.user_id);
                    if (member == null)
                    {
                        var newMember = new Member
                        {
                            MemberId = user.user_id,
                            LastName = user.last_name,
                            FirstName = user.first_name,
                            Email = user.email,
                            CellPhone = user.cell_phone,
                            Gender = user.gender,
                            Scout = user.scout,
                            CurrentPosition = user.current_position,
                            CurrentRank = user.current_rank,
                            PhotoUrl = user.avatar,
                            Patrol = user.patrol,
                            PatrolId = user.patrol_id,
                            TroopNumber = user.troop_number,
                            DateOfBirth = user.born_on
                        };
                        _context.Member.Add(newMember);
                    }
                    else
                    {
                        member.CurrentPosition = user.current_position;
                        member.CurrentRank = user.current_rank;
                        member.PhotoUrl = user.avatar;
                        member.Patrol = user.patrol;
                        member.PatrolId = user.patrol_id;
                        member.DateOfBirth = user.born_on;
                        member.Email = user.email;
                        member.CellPhone = user.cell_phone;
                        Update(member);
                    }
                }
            }
        }
    }
}
