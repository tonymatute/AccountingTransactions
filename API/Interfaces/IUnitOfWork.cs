using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        //IScoutRepository ScoutRepository { get; }
        IMemberRepository MemberRepository { get; }
        IUserRepository UserRepository { get; }
        //IAdultRepository AdultRepository { get; }
        bool HasChanges();
        Task<bool> Complete();

    }
}
