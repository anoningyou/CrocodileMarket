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

    [HttpPost(nameof(EditOffer))]
    public async Task<ActionResult<SaleOfferDto>> EditOffer(SaleOfferDto dto)
    {
        var result = await _uow.SaleOffersRepository.EditAsync(dto, User.GetUserId().Value);
        await _uow.Complete();
        return Ok(result);
    }

    [HttpGet(nameof(GetUserSales))]
    public async Task<ActionResult<List<SaleOfferDto>>> GetUserSales()
    {
        return Ok(await _uow.SaleOffersRepository.GetUserSalesAsync(User.GetUserId().Value));
    }

    [HttpGet(nameof(GetSaleOffers))]
    public async Task<ActionResult<List<SaleOfferDto>>> GetSaleOffers()
    {
        return Ok(await _uow.SaleOffersRepository.GetAllAsync());
    }

    [HttpGet(nameof(GetSaleOffer))]
    public async Task<ActionResult<SaleOfferDto>> GetSaleOffer(Guid id)
    {
        return Ok(await _uow.SaleOffersRepository.GetByIdAsync(id));
    }

    [HttpDelete(nameof(RemoveSaleOffer))]
    public async Task<ActionResult<bool>> RemoveSaleOffer(Guid id)
    {
        var result = await _uow.SaleOffersRepository.RemoveAsync(id, User.GetUserId().Value);
        await _uow.Complete();
        return Ok(result);
    }
}
