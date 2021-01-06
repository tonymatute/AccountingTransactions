using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Threading.Tasks;

namespace API.Interfaces
{
  public interface IAdultRepository
    {
        Task<PageList<AdultDto>> GetAdultsAsync(AdultParams adultParams);
        Task<AdultDto> GetAdultAsync(int id);

        void Update(Adult adult);
    }
}
