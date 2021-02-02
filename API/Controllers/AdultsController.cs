using API.Data;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Globalization;
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

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<AdultDto>>> GetAdults([FromQuery] AdultParams adultParams)
        //{
        //    var adults = await _unitOfWork.AdultRepository.GetAdultsAsync(adultParams);
        //    Response.AddPaginationHeader(adults.CurrentPage, adults.PageSize, adults.TotalCount, adults.TotalPages);

        //    return Ok(adults);
        //}

        //[HttpPost("add-adult")]
        //public async Task<ActionResult<AdultDto>> AddAdult(AdultDto adultDto)
        //{
        //    TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
        //    adultDto.LastName = textInfo.ToTitleCase(adultDto.LastName);
        //    adultDto.FirstName = textInfo.ToTitleCase(adultDto.FirstName);

        //    var adult = await _unitOfWork.AdultRepository.FindAdultByNameAsync(adultDto.LastName, adultDto.FirstName);
        //    if (adult != null) return BadRequest("Adult Member alredy exists!");

        //    var newADult = await _unitOfWork.AdultRepository.AddAdultAsync(adultDto);

        //    if (!await _unitOfWork.Complete()) return BadRequest("Failed to add new adult member.");

        //    return Ok(newADult);
        //}
    }
}
