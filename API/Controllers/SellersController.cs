using API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;

[Authorize]
public class SellersController : BaseApiController
{
    private readonly IUnitOfWork _uow;

    public SellersController(IUnitOfWork uow)
    {
        _uow = uow;
    }

    [HttpPost(nameof(AddSaleOffer))]
    public async Task<ActionResult<SaleOfferDto>> AddSaleOffer(SaleOfferDto dto)
    {
        var result = await _uow.SaleOffersRepository.AddAsync(dto, User.GetUserId().Value);
        await _uow.Complete();
        return Ok(result);
    }

    [HttpGet(nameof(GetSaleOffers))]
    public async Task<ActionResult<List<SaleOfferDto>>> GetSaleOffers()
    {
        return Ok(await _uow.SaleOffersRepository.GetAllAsync());
    }

    [HttpDelete(nameof(RemoveSaleOffer))]
    public async Task<ActionResult<bool>> RemoveSaleOffer(Guid id)
    {
        var result = await _uow.SaleOffersRepository.RemoveAsync(id);
        await _uow.Complete();
        return Ok(result);
    }
}
