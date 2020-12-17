using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IScoutRepository scoutRepository { get; }
        bool HasChanges();
        Task<bool> Complete();

    }
}
