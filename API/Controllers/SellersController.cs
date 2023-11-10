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
        var result = await _uow.SaleOffersRepository.AddAsync(dto, User.GetUserId());
        await _uow.Complete();
        return Ok(result);
    }

    [HttpGet(nameof(GetSaleOffers))]
    public async Task<ActionResult<List<SaleOfferDto>>> GetSaleOffers()
    {
        return Ok(await _uow.SaleOffersRepository.GetAllAsync());
    }
}
