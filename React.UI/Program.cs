var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment;

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpa(spa =>
{
    spa.Options.SourcePath = env.ContentRootPath + "ClientApp";
    if (env.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer(baseUri: "http://localhost:3000");
    }
});
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
