using System.ComponentModel.DataAnnotations.Schema;
using anota_backend.Helper;

namespace anota_backend.Models;

[Table("Company")]
public class CompanyModel
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string User { get; set; }
    public string Pass { get; set; }
    public string PathRouteKey { get; set; }
    public string primaryColor { get; set; }
    public string SecondaryColor { get; set; }
    public bool IsPaid { get; set; }
    public string Plan { get; set; }

    public bool isValidPass(string pass)
    {
        return Pass == pass.generateHash();
    }

    public void parsePassToHash()
    {
        Pass = Pass.generateHash();
    }

}