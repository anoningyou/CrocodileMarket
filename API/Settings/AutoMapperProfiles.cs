using AutoMapper;

namespace API;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<DateTime, DateTime>()
                .ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));

        CreateMap<DateTime?, DateTime?>()
            .ConvertUsing(d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);

        CreateMap<RegisterDto, AppUser>().ReverseMap();
        CreateMap<UserDto, AppUser>().ReverseMap();
        CreateMap<LoginDto, AppUser>().ReverseMap();
        CreateMap<SaleOfferDto, SaleOffer>().ReverseMap();
    }
}
