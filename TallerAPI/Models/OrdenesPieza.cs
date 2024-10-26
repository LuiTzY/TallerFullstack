using System;
using System.Collections.Generic;

namespace TallerAPI.Models;

public partial class OrdenesPieza
{
    public int OrdenId { get; set; }

    public int PiezaId { get; set; }

    public int Cantidad { get; set; }

    public virtual OrdenesTrabajo Orden { get; set; } = null!;

    public virtual Pieza Pieza { get; set; } = null!;
}
