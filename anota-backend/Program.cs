using anota_backend.Context;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

var connectionString = $"server=localhost;initial catalog=anota;uid=root;pwd={dbPassword}";

builder.Services.AddDbContext<ContextData>(options =>
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(9, 1, 0))
    )
);

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configuração do pipeline de requisição
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
