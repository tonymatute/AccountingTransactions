using API.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using API.Entities;

namespace API.Interfaces
{
    public interface IScoutRepository
    { 
        Task<PageList<ScoutDto>> GetScoutsAsync(ScoutParams userParams);
        Task<ScoutDto> GetScoutAsync(int id);
        Task<List<SelectList>> GetListTypesAsync(string listType);
        void Update(Scout scout);
        Task<Scout> FindScoutByIdAsync(int id);
        Task<Scout> FindScoutByPublicIdAsync(string PublicId);


    }
}
