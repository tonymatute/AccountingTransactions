using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Scout, ScoutDto>()
             .ForMember(s => s.Age, opt => opt.MapFrom(scout => scout.DateOfBirth.CalculateAge()));

            CreateMap<Transaction, TransactionDto>();

        }
    }
}
