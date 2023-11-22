using System.ComponentModel.DataAnnotations;

namespace API;

public class SaleOfferDto : BaseDto
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    public decimal Price { get; set; } 
    public string Description { get; set; } 
}
