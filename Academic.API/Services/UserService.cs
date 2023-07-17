using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Academic.API.Models;
using Hasher = Rijndael256.Rijndael;

namespace Academic.API.Services;

public interface IUserService
{
    AuthenticateResponse? Authenticate(AuthenticateRequest model);
    IEnumerable<Docente> GetAll();
    Docente GetById(int id);
}

public class UserService : IUserService
{

    private readonly AcademicContext _context;

    private List<Docente> _docentes;

    private readonly IConfiguration _configuration;

    public UserService(AcademicContext context, IConfiguration configuration)
    {
        _context = context;
        _docentes = _context.Docentes.ToList();
        _configuration = configuration;
    }

    public AuthenticateResponse? Authenticate(AuthenticateRequest model)
    {
        var docente = _docentes.SingleOrDefault(x => x.Email == model.Email);
        // return null if user not found
        if (docente == null) return null;
        docente.Password = Hasher.Decrypt(docente.Password, _configuration["JWT:key"], Rijndael256.KeySize.Aes256);

        if (docente.Password != model.Password) return null;
        // authentication successfull so generate jwt token
        var token = JwtTokenBuilder(docente);

        return new AuthenticateResponse(docente, token, _configuration);
    }

    public IEnumerable<Docente> GetAll()
    {
        return _docentes;
    }

    public Docente GetById(int id)
    {
        return _docentes.FirstOrDefault(x => x.IdDocente == id) ?? throw new InvalidOperationException();
    }

    // helper methods

    private string JwtTokenBuilder(Docente docente)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["JWT:key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim("id", docente.IdDocente.ToString()),
                new Claim("nombre", $"{docente.Nombres} {docente.ApellidoPaterno} {docente.ApellidoMaterno}"),
                }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
