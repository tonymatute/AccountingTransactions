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
            CreateMap<Scout, ScoutDto>()
              .ForMember(s => s.Age, opt => opt.MapFrom(scout => scout.DateOfBirth.CalculateAge()))
              .ForMember(r => r.RankName, opt => opt.MapFrom(rank =>
                     rank.Ranks.FirstOrDefault(x => x.ActiveRank).RankName));
            CreateMap<Transaction, TransactionDto>();
            CreateMap<BuckTransaction, BuckTransactionDto>();
            CreateMap<Adult, AdultDto>();
            CreateMap<Rank, RankDto>();
            CreateMap<ScoutUpdateDto, Scout>();
            CreateMap<PhotoDto, Scout>();


        }
    }
}
