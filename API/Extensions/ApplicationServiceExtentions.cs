using API.Data;
using API.Data.Interfaces;

namespace API;

public static class ApplicationServiceExtentions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddCors();
        //services.AddScoped<ITokenService, TokenService>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
