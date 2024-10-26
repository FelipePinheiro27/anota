using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace anota_backend.Models;

[Table("Block")]
public class BlockModel
{
    public long Id { get; set; }
    [ForeignKey("Company")]
    public long Company_id { get; set; }
    public string Name { get; set; }
    public int Modality { get; set; }
    public string? Description { get; set; }
    public string? Image_url { get; set; }
}
