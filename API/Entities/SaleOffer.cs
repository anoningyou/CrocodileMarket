namespace API;

public class SaleOffer : BaseEntity
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public Guid UserId { get; set; }
    public string Description { get; set; } 

    public virtual AppUser User {get; set;}
}
