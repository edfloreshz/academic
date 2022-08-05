
namespace Academic.API.Models;
public class AuthenticateResponse
{
    public int IdDocente { get; set; }
    public string Nombre { get; set; }
    public string ApellidoPaterno { get; set; }
    public string ApellidoMaterno { get; set; }
    public string Email { get; set; }
    public bool? Activo { get; set; }
    public bool? Administrador { get; set; }
    public string Token { get; set; }

    public AuthenticateResponse(Docente user, string token)
    {
        IdDocente = user.IdDocente;
        Nombre = user.Nombres;
        ApellidoPaterno = user.ApellidoPaterno;
        ApellidoMaterno = user.ApellidoMaterno;
        Email = user.Email;
        Activo = user.Activo;
        Administrador = user.Administrador;
        Token = token;
    }
}
