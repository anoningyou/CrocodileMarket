namespace API;

public interface ISaleOffersRepository
{
    Task<SaleOfferDto> AddAsync(SaleOfferDto saleOffer, Guid userId); 
    Task<List<SaleOfferDto>> GetAllAsync(); 
    Task<bool> RemoveAsync(Guid id);
}
