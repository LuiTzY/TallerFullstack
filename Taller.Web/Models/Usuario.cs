using System;
using System.Collections.Generic;

namespace Taller.Web.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Password { get; set; }

    public DateOnly? CreatedAt { get; set; }
}
