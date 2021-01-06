using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class LookupController : BaseAPIController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LookupController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("{listType}")]
        public async Task<List<SelectList>> GetListTypesAsync(string listType)
        {           
            var loopUpTable =  await _unitOfWork.ScoutRepository.GetListTypesAsync(listType);
            return loopUpTable;
        }

        [HttpGet("GetRanks")]
        public async Task<List<RankDto>> GetRanks()
        {
            return await _unitOfWork.ScoutRepository.GetRanksAsync(); 
        }

        [HttpGet("GetLeadership")]
        public async Task<List<LeadershipDto>> GetLeadership()
        {
            return await _unitOfWork.ScoutRepository.GetLeadershipAsync();
        }
    }
}
