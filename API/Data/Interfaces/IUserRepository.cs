namespace API.Data.Interfaces;

public interface IUserRepository
{
    Task AddAsync(AppUser user);
    void Update(AppUser user);
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser> GetUserById(Guid id);
    Task<AppUser> GetUserByName(string name);
    Task<bool> AnyAsync();
    Task<bool> AnyAsync(string name);
}
