using API.DTOs;
using API.Entities;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IMemberRepository
    {
        void Update(Member member);
        Task GetMembersFromTroopTrarckAsync();
        Task<Member> FindMemberByIdAsync(int id);
        Task<PageList<MemberDto>> GetMembersAsync(MemberParams memberParams);
        Task<MemberDto> GetMemberAsync(int id);
        Task<Member> FindMemberByNameAsync(string lastName, string firstName);
        List<SelectList> GetListTypes(string listType);
        List<PatrolDto> GetPatrolList();
    }
}
