using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);
builder.Logging.AddFilter("Microsoft.AspNetCore.Authentication", LogLevel.Debug);
builder.Logging.AddFilter("Microsoft.IdentityModel", LogLevel.Debug);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// AUTH (Keycloak interno en Kubernetes)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // OJO: Servicio interno de Kubernetes, NO devops.local
        options.Authority = "https://devops.local/auth/realms/devops-realm";
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false
        };


        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = context =>
            {
                var realmAccess = context.Principal?.FindFirst("realm_access");
                if (realmAccess != null)
                {
                    using var doc = JsonDocument.Parse(realmAccess.Value);
                    if (doc.RootElement.TryGetProperty("roles", out var roles))
                    {
                        var claims = roles.EnumerateArray()
                            .Select(r => new Claim(ClaimTypes.Role, r.GetString()!));

                        context.Principal!.AddIdentity(new ClaimsIdentity(claims));
                    }
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy
            .WithOrigins("https://devops.local")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("DevCors");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
