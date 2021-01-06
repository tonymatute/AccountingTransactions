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
                     rank.ScoutRanks.FirstOrDefault(x => x.ActiveRank).RankName));
            CreateMap<Transaction, TransactionDto>();
            CreateMap<BuckTransaction, BuckTransactionDto>();
            CreateMap<Adult, AdultDto>();
            CreateMap<Rank, RankDto>();
            CreateMap<ScoutRank, ScoutRankDto>()
                .ForMember(s => s.RankName, opt => opt.MapFrom(ranks => ranks.Ranks.RankName));
            CreateMap<ScoutUpdateDto, Scout>();
            CreateMap<PhotoDto, Scout>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Leadership, LeadershipDto>();
            CreateMap<AdultLeadership, AdultLeadershipDto>()
                  .ForMember(s => s.Name, opt => opt.MapFrom(leadership => leadership.Leaderships.Name));

        }
    }
}
