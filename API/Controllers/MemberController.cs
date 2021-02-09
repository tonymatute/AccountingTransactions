using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class MemberController : BaseAPIController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public MemberController(IUnitOfWork unitOfWork,
            IMapper mapper,
            DataContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers([FromQuery] MemberParams memberParams)
        {
            var members = await _unitOfWork.MemberRepository.GetMembersAsync(memberParams);
            Response.AddPaginationHeader(members.CurrentPage, members.PageSize, members.TotalCount, members.TotalPages);

            return Ok(members);
        }

        [HttpGet("{id}", Name = "GetMember")]
        public async Task<ActionResult<MemberDto>> GetMember(int id)
        {
            return await _unitOfWork.MemberRepository.GetMemberAsync(id);
        }

        [HttpGet("GetPatrolList")]
        public List<PatrolDto> GetPatrolList()
        {
            return _unitOfWork.MemberRepository.GetPatrolList();
        }

        [HttpGet("GetTransactionTypes")]
        public List<TransactionTypeDto> GetTransactionTypes()
        {
            return _unitOfWork.MemberRepository.GetTransactionTypeList();
        }

        [HttpGet("GetActivityTypes")]
        public List<ActivityTypeDto> GetActivityTypes()
        {
            return _unitOfWork.MemberRepository.GetActivityTypeList();
        }

        [HttpPost("add-transaction/{memberId}")]
        public async Task<ActionResult<TransactionDto>> AddTransaction(int memberId, [FromQuery()] TransactionParams transactionParams)
        {
            var member = await _unitOfWork.MemberRepository.FindMemberByIdAsync(memberId);
            if (member == null) return NotFound("Member Not Found!");

            var transactionType = _unitOfWork.MemberRepository.FindTransactionTypeById(transactionParams.TransactionTypeId);
            var activityType = _unitOfWork.MemberRepository.FindActivityTypeById(transactionParams.ActivityTypeId);

            if (transactionParams.TransactionTypeId == 7)
            {
                member.RechartedDate = transactionParams.TransactionDate;
                _unitOfWork.MemberRepository.Update(member);
                if (!await _unitOfWork.Complete()) return BadRequest("Failed to update member.");
            }

            var newTransaction = new Transaction
            {
                Member = member,
                TransactionTypeName = transactionType != null ? transactionType.TransactionTypeName : "",
                TransactionCredit = transactionParams.TransactionCredit,
                TransactionDebit = transactionParams.TransactionDebit,
                TransactionDate = transactionParams.TransactionDate,
                ActivityTypeName = activityType != null ? activityType.ActivityTypeName : "",
                ActivityTypeCost = activityType != null ? activityType.Cost : 0,
                ActivityTypeLocation = activityType != null ? activityType.Location : "",
                Created = DateTime.Now,
                Reconciliated = false,
                CheckNumber = transactionParams.CheckNumber,
                Comments = transactionParams.Comments
            };


            _unitOfWork.MemberRepository.AddTransaction(newTransaction);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to add transaction to member.");

        }

        [HttpPost("update-trooptrack-members")]
        public async Task<ActionResult> UpdateTroopTrackMembers()
        {
            await _unitOfWork.MemberRepository.UpdateTroopTrackMembers();

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to Update TroopTrack Members.");
        }

        [HttpDelete("delete-transaction")]
        public async Task<ActionResult> DeleteTransaction([FromQuery] int memberId, int transactionId)
        {
            var member = await _unitOfWork.MemberRepository.FindMemberByIdAsync(memberId);
            if (member == null) return NotFound("Member Not Found!");

            var transaction = member.Transactions.FirstOrDefault(x => x.TransactionId == transactionId);
            if (transaction == null) return NotFound("Transaction not found!");
            
            member.Transactions.Remove(transaction);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest(" Failed to delete transaction.");
        }
    }
}
