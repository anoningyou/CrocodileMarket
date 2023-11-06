using API.Data;
using API.Data.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API;

public class UserRepository : IUserRepository
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    public UserRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;

    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task AddAsync(AppUser entity)
    {

        await _context.Users.AddAsync(entity);
    }

    public async Task AddRangeAsync(IEnumerable<UserDto> dtos)
    {
        await _context.Users.AddRangeAsync(dtos.Select(dto => _mapper.Map<AppUser>(dto)));
    }
    public async Task<AppUser> GetUserById(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByName(string name)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserName == name.ToLower());
    }


    public async Task<bool> AnyAsync()
    {
        return await _context.Users.AnyAsync();
    }

    public async Task<bool> AnyAsync(string name)
    {
        return await _context.Users.AnyAsync(u => u.UserName == name.ToLower());
    }

    public void Update(AppUser user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }
}
