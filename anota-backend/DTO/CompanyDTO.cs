namespace anota_backend.DTO;

public class CompanyDTO
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string PathRouteKey { get; set; }
    public string PrimaryColor { get; set; }
    public string SecondaryColor { get; set; }
    public string? LogoUrl { get; set; }

}