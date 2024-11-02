using System;
using System.Collections.Generic;

namespace Taller.Web.Models;

public partial class Nota
{
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? UserId { get; set; }

    public virtual Usuario? User { get; set; }
}
