namespace API;

public interface ISaleOffersRepository
{
    Task<SaleOfferDto> AddAsync(SaleOfferDto saleOffer, Guid userId); 
    Task<SaleOfferDto> EditAsync(SaleOfferDto saleOffer, Guid userId); 
    Task<List<SaleOfferDto>> GetAllAsync(); 
    Task<List<SaleOfferDto>> GetUserSalesAsync(Guid userId); 
    Task<bool> RemoveAsync(Guid id, Guid userId);
    Task<SaleOfferDto> GetByIdAsync(Guid id);
}
