namespace anota_backend.DTO;

public class CourtsDTO
{
    public long Company_id { get; set; }
    public string Name { get; set; }
    public int Modality { get; set; }
    public string? Description { get; set; }
    public string? Image_url { get; set; }
}