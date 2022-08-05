var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment;
var config = builder.Configuration;

// Add services to the container.
builder.Services.AddHealthChecks();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddDbContext<academicContext>(options => {
    var connectionString = env.IsDevelopment()
            ? config["ConnectionStrings:DevelopmentDatabase"]
            : config["ConnectionStrings:ProductionDatabase"];
    options.UseMySQL(connectionString);
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(4);
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:issuer"],
        ValidAudience = builder.Configuration["JWT:audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:key"]))
    };
});

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Creciendo Juntos API",
        Version = "v1",
        Contact = new OpenApiContact
        {
            Name = "Creciendo Juntos",
            Email = string.Empty,
            Url = new Uri("https://kindercreciendojuntos.com/"),
        },
    });
});

config
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// Kestrel
var host = builder.WebHost;
host.UseKestrel();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseRouting();
app.UseCookiePolicy();
app.UseSession();
app.UseAuthorization();
app.UseAuthentication();
app.UseMiddleware<JwtMiddleware>();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.MapHealthChecks("/health");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

app.MapControllers();

app.Run();