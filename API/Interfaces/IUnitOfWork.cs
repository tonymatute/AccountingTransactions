using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IScoutRepository ScoutRepository { get; }
        IUserRepository UserRepository { get; }
        IAdultRepository AdultRepository { get; }
        bool HasChanges();
        Task<bool> Complete();

    }
}
