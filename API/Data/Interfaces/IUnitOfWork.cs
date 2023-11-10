namespace API.Data.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository {get;} 
    ISaleOffersRepository SaleOffersRepository {get;} 
    Task<bool> Complete();
    bool HasChanges();  
}
