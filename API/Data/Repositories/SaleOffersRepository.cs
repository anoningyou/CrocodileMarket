
using API.Data;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API;

public class SaleOffersRepository : ISaleOffersRepository
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    
    public SaleOffersRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<SaleOfferDto> AddAsync(SaleOfferDto saleOffer, Guid userId)
    {
        if (saleOffer.Id == null)
            saleOffer.Id = Guid.NewGuid();
        var entity = _mapper.Map<SaleOffer>(saleOffer);
        entity.UserId = userId;
        await _context.SaleOffers.AddAsync(entity);

        return  _mapper.Map<SaleOfferDto>(entity);
    }

    public async Task<SaleOfferDto> EditAsync(SaleOfferDto saleOffer, Guid userId)
    {
        if (saleOffer.Id == null)
            throw new Exception("Id must be not null");

        var entity = await _context.SaleOffers.FindAsync(saleOffer.Id.Value);

        if (entity == null)
            throw new Exception($"SaleOffer with Id = {saleOffer.Id} not found");

        if (entity.UserId != userId)
            throw new Exception($"SaleOffer with Id = {saleOffer.Id} not belongs to user with Id = {userId}");

        _mapper.Map(saleOffer, entity);

        return  _mapper.Map<SaleOfferDto>(entity);
    }

    public async Task<bool> RemoveAsync(Guid id, Guid userId)
    {
        var entity = await _context.SaleOffers.FindAsync(id);
        
        if (entity != null && entity.UserId == userId)
        {
            _context.SaleOffers.Remove(entity);
            return true;
        }
        else 
            return false;
    }

    public async Task<List<SaleOfferDto>> GetAllAsync()
    {
        return await _context.SaleOffers
            .AsNoTracking()
            .ProjectTo<SaleOfferDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<SaleOfferDto> GetByIdAsync(Guid id)
    {
        return await _context.SaleOffers
            .AsNoTracking()
            .ProjectTo<SaleOfferDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<List<SaleOfferDto>> GetUserSalesAsync(Guid userId)
    {
        return await _context.SaleOffers
            .AsNoTracking()
            .Where(s => s.UserId == userId)
            .ProjectTo<SaleOfferDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
