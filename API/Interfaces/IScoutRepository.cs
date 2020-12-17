using API.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Interfaces
{
    public interface IScoutRepository
    { 
        Task<PageList<ScoutDto>> GetScoutsAsync(SearchParams userParams);
        Task<ScoutDto> GetScoutAsync(int id);
    }
}
