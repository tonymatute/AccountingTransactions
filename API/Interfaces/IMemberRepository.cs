using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Collections.Generic;
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
        List<PatrolDto> GetPatrolList();
        List<TransactionTypeDto> GetTransactionTypeList();
        List<ActivityTypeDto> GetActivityTypeList();
        void AddTransaction(Transaction transaction);
        TransactionTypeDto FindTransactionTypeById(int transactionTypeId);
        ActivityTypeDto FindActivityTypeById(int activityTypeId);
        Task UpdateTroopTrackMembers();

    }
}
