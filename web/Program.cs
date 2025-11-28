using Microsoft.EntityFrameworkCore;
using web.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

// Register your DbContext
builder.Services.AddDbContext<WelfareDb>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/UserLogin/Index");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// IMPORTANT: Set default route to UserLogin
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=UserLogin}/{action=Index}/{id?}");

app.Run();