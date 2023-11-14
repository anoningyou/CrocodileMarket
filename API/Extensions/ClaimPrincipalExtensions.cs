using System.Security.Claims;

namespace API;

public static class ClaimPrincipalExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static Guid? GetUserId(this ClaimsPrincipal user)
        {
            var val = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return val != null ? Guid.Parse(val) : null;
        }

        public static UserDto GetUser(this ClaimsPrincipal user)
        {
            var id = GetUserId(user);
            if (id != null)
                return new UserDto() 
                {
                    Id = id.Value,
                    UserName = GetUserName(user)
                };
            else 
                return null;
        }
    }
