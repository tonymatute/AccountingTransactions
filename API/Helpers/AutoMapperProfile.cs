using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;
using System.Linq;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {

            CreateMap<Member, MemberDto>()
             .ForMember(m => m.Age, opt => opt.MapFrom(member => member.DateOfBirth.CalculateAge()));
            CreateMap<MemberDto, Member>();          
            CreateMap<Transaction, TransactionDto>();
            CreateMap<TransactionDto, Transaction>();
            CreateMap<RegisterDto, AppUser>();
           

        }
    }
}
