using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using TallerAPI.Models;

namespace TallerAPI.ViewModels.Client
{
    //Este sera como mi serializador en DRF, definire todos los campos que requiera para
    //crear mi registro de la entidad, esta instancia sera llenada por los datos en la req
    // asi se crea una instanacia del modelo y le pasamos los datos de las propiedades a definir
    public class ClientViewModel
    {
        [Required(ErrorMessage = "Debes de proporcionar un nombre para el cliente")]
        [DisplayName("Nombre del cliente")]
        public string Nombre { get; set; } = null!;

        public string? Telefono { get; set; }

        public string? Email { get; set; }

        public string? Direccion { get; set; }

        public virtual ICollection<Vehiculo>? Vehiculos { get; set; } = new List<Vehiculo>();

    }
}
