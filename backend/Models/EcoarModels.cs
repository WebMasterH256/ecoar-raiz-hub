using System.ComponentModel.DataAnnotations;

namespace EcoarBackend.Models;

public class Profile
{
    [Key]
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public int Sementes { get; set; } = 0;
    public string Nivel { get; set; } = "Broto";
    public string? Bairro { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Activity
{
    [Key]
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public string? Data { get; set; }
    public string? Local { get; set; }
    public int Sementes { get; set; }
    public int Vagas { get; set; }
    public int Inscritos { get; set; } = 0;
    public string Status { get; set; } = "Em Breve";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Enrollment
{
    [Key]
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public Guid ActivityId { get; set; }
    public string Status { get; set; } = "Inscrito";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Reward
{
    [Key]
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public int Custo { get; set; }
    public string? Tag { get; set; }
}

public class RedeLocal
{
    [Key]
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string Endereco { get; set; } = string.Empty;
    public string? MapsUrl { get; set; }
}
