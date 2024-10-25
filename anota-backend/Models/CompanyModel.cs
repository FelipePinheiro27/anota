using System.ComponentModel.DataAnnotations.Schema;

namespace anota_backend.Models;

[Table("Company")]
public class CompanyModel
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string User { get; set; }
    public string Pass { get; set; }
}