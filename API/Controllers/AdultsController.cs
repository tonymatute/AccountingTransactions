using API.Data;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class AdultsController : BaseAPIController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly DataContext _context;

        public AdultsController(
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

        public async Task<ActionResult<IEnumerable<AdultDto>>> GetAdults([FromQuery] AdultParams adultParams)
        {
            var adults = await _unitOfWork.AdultRepository.GetAdultsAsync(adultParams);
            Response.AddPaginationHeader(adults.CurrentPage, adults.PageSize, adults.TotalCount, adults.TotalPages);

            return Ok(adults);
        }
    }
}
