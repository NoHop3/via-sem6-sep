using Backend.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() {
        Title = "Backend", Version = "v1"
    });
});

var provider = builder.Services.BuildServiceProvider();
var configuration =builder.Configuration
                   .AddJsonFile("appsettings.json")
                   .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json")
                   .AddEnvironmentVariables();//provider.GetRequiredService<IConfiguration>();

var connectionString = provider.GetRequiredService<IConfiguration>().GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseSqlite(connectionString);
});

builder.Services.AddCors(options =>
{
    var frontendUrl = provider.GetRequiredService<IConfiguration>().GetValue<string>("frontend_url")!;
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontendUrl)
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "";
    });
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
