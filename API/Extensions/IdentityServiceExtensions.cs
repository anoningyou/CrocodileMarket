using Microsoft.AspNetCore.Authentication.Cookies;

namespace API;

public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
         IConfiguration config )
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => options.LoginPath = "/login");
            services.AddAuthorization();
            return services;
        } 
    }
