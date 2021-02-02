using API.Data;
using API.DTOs;
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
        private readonly IPhotoService _photoService;
        private readonly DataContext _context;

        public MemberController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService,
            DataContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
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
        public  List<PatrolDto> GetPatrolList()
        {
            return _unitOfWork.MemberRepository.GetPatrolList();
        }

    }
}
