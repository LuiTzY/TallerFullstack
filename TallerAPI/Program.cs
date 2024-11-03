using Microsoft.EntityFrameworkCore;
using TallerAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TallerBdContext>(options =>
       options.UseSqlServer(builder.Configuration.GetConnectionString("TallerBdContext")));

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
//agregamos el cors para poder hacer solicitudes desde el front con angular
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            //aqui agregamos los origenes
            builder.WithOrigins("http://localhost", "http://localhost:4200")
            .AllowAnyMethod() //configuramos para que se permita cualquier metodo http
            .AllowAnyHeader() //configuramos para que se permita cualquier headers
            .SetIsOriginAllowedToAllowWildcardSubdomains(); 
        });
});
var app = builder.Build();




// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins);
app.MapControllers();

app.Run();
