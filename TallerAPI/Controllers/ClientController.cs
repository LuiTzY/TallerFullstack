using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using TallerAPI.Models;
using TallerAPI.ViewModels;
using TallerAPI.ViewModels.Client;

namespace TallerAPI.Controllers
{
    [ApiController]
    //se define la ruta 
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
     


        //declaramos la propieda donde inyectaremos nuestro db context para ejecutar los metodos necesarios
        private readonly TallerBdContext _context;

        //constructor de la clase del controlador, aqui hacemos la inyeccion de dependencias
        public ClientController(TallerBdContext context) {
            //inyectamos la dependencia con nuestro db context 
            _context = context;
        }

        //primero definimos que el metodo repondera a un metodo http y el nombre que tendra sobre la ruta
        [HttpGet("clients")]
        public async Task<ActionResult<IEnumerable<Cliente>>> getClients() {
            // retornamos la lista de los clientes que obtuvimos
            return await _context.Clientes.ToListAsync();
        }

        //esperamos que nos pasen un ID para obtener los resultados de ese cliente
        [HttpGet("clients/{id}")]
        public async Task<ActionResult<IEnumerable<Cliente>>> getClient(int id)
        {
            var client = await _context.Clientes.FindAsync(id); 

            //si el cliente es nulo es xq no se encontro con el parametro que nos pasan por la URL
            if (client == null) return NotFound("No encontramos al cliente");
            
            //retornamos un estado 200 con el cliente que obtuvimos
            return Ok(client);
        }

        [HttpPost("clients")]
        public async Task<ActionResult<IEnumerable<Cliente>>> createClient ( ClientViewModel data) {
            
            //creamos una nueva y la instanciamos con los datos que nos llegan por el body
            var client = new Cliente
            {
                Nombre = data.Nombre,
                Telefono = data.Telefono,
                Email = data.Email
            };

            //agregamos al cliente 
            _context.Clientes.Add(client);

            //esperamos que se guarden los cambios
            await _context.SaveChangesAsync();

            //retornamos la accion de obtener un cliente y le pasamos los datos del cliente creado, de igual manera podriamos retornar un OK
            return CreatedAtAction("getClient", new { id = client.ClienteId }, client);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Cliente>>> deleteClient(int id)
        {

            var client = await _context.Clientes.FindAsync(id);

            if (client == null)
            {
                return NotFound("No pudimos encontrrar un cliente que coincida con el ID proporcionado");
            }

            _context.Clientes.Remove(client);
            await _context.SaveChangesAsync();

            //retornamos la respuesta de no content indicando que el elemento se borro correctamente 
            return NoContent();
        }
        [HttpPut("clients/{id}")]
        public async Task<IActionResult> updateClient(int id, ClientViewModel data)
        {
            var client = await _context.Clientes.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            // Asignamos los valores del `data` al `client`
            client.Nombre = data.Nombre;
            client.Telefono = data.Telefono;
            client.Email = data.Email;

            // Marcamos el cliente como modificado
            _context.Entry(client).State = EntityState.Modified;

            try
            {
                //guardamos
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Retornamos un 204
            return NoContent();
        }

        private bool ClienteExists(int id)
        {
            //verifica si dentro de todos los registrosd de la bd alguno cumple con el id que le pasamos
            return _context.Clientes.Any(e => e.ClienteId == id);
        }


        
    }

}
