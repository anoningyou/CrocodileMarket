
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
        var entity = _mapper.Map<SaleOffer>(saleOffer);
        entity.UserId = userId;
        await _context.SaleOffers.AddAsync(entity);

        return  _mapper.Map<SaleOfferDto>(entity);
    }

    public async Task<List<SaleOfferDto>> GetAllAsync()
    {
        return await _context.SaleOffers
            .AsNoTracking()
            .ProjectTo<SaleOfferDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
