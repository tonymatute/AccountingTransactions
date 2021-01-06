using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace API.Controllers
{
    [Authorize]
    public class ScoutController : BaseAPIController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly DataContext _context;

        public ScoutController(
            IUnitOfWork unitOfWork, 
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
        public async Task<ActionResult<IEnumerable<ScoutDto>>> GetScouts([FromQuery] ScoutParams scoutParams)
        {
            var scouts = await _unitOfWork.ScoutRepository.GetScoutsAsync(scoutParams);
            Response.AddPaginationHeader(scouts.CurrentPage, scouts.PageSize, scouts.TotalCount, scouts.TotalPages);

            return Ok(scouts);
        }

        [HttpGet("{id}", Name = "GetScout")]
        public async Task<ActionResult<ScoutDto>> GetScout(int id)
        {
            return await _unitOfWork.ScoutRepository.GetScoutAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateScout(ScoutUpdateDto scoutUpdateDto)
        {
            var scout = await _unitOfWork.ScoutRepository.FindScoutByIdAsync(scoutUpdateDto.MemberId);
            _mapper.Map(scoutUpdateDto, scout);
            _unitOfWork.ScoutRepository.Update(scout);
            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update Scout!");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<ScoutDto>> AddPhoto(IFormFile file, int memberId)
        {
            var scout = await _unitOfWork.ScoutRepository.FindScoutByIdAsync(memberId);
            if (scout == null) return NotFound("Scout Not Found!");

            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            if (scout.PublicId != null)
            {                
                var deleteResult = await _photoService.DeletePhotoAsync(scout.PublicId);
                if (deleteResult.Error != null) return BadRequest(deleteResult.Error.Message);
            }

            scout.PhotoUrl = result.SecureUrl.AbsoluteUri;
            scout.PublicId = result.PublicId;

            _unitOfWork.ScoutRepository.Update(scout);
            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetScout", new { id = memberId }, _mapper.Map<ScoutDto>(scout));
            }

            return BadRequest("Problem adding photo!");
        }

        [HttpDelete("delete-photo/{PublicId}")]
        public async Task<ActionResult> DeletePhoto(string PublicId)
        {
            var scout = await _unitOfWork.ScoutRepository.FindScoutByPublicIdAsync(PublicId);
            if (scout == null) return NotFound("Scout Not Found!");

            if (scout.PublicId != null)
            {
                scout.PhotoUrl = null;
                scout.PublicId = null;
                var result = await _photoService.DeletePhotoAsync(PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            _unitOfWork.ScoutRepository.Update(scout);
            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting photo!");

        }

        [HttpPost("add-scout")]
        public async Task<ActionResult<ScoutDto>> AddScout(ScoutDto scoutDto)
        {
            var scout = await _unitOfWork.ScoutRepository.AddScout(scoutDto);

            return Ok(scout);
        }


        [HttpPost("add-rank/{scoutId}")]
        public async Task<ActionResult<RankDto>> AddRank(int scoutId, [FromQuery()] RankParams rankParams)
        {
            var scout = await _unitOfWork.ScoutRepository.FindScoutByIdAsync(scoutId);
            if (scout == null) return NotFound("Scout Not Found!");

            var currentRank = await _unitOfWork.ScoutRepository.FindActiveRankByIdAsync(scoutId);
            if (currentRank != null)
            {
                currentRank.ActiveRank = false;
                _unitOfWork.ScoutRepository.UpdateRank(currentRank);
                if (!await _unitOfWork.Complete()) return BadRequest("Failed to Update Current rank.");
            }

            var newRank = new ScoutRank
            {
                ActiveRank = rankParams.ActiveRank,
                CompletedOn = rankParams.CompletedOn,
                RankId = rankParams.RankId,
                RankName = rankParams.RankName,
                ScoutId = scoutId               
            };

            _context.ScoutRanks.Add(newRank);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to add rank to scout.");
        }
    }
}
