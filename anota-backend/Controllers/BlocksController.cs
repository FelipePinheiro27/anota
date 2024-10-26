using anota_backend.Context;
using anota_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace anota_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlocksController : ControllerBase
{
    private readonly ContextData _context;

    public BlocksController(ContextData context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlockModel>>> GetBlocks()
    {
        return await _context.Blocks.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BlockModel>> GetBlock(long id)
    {
        var block = await _context.Blocks.FindAsync(id);

        if (block == null)
        {
            return NotFound();
        }

        return block;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBlock(BlockModel block)
    {
        _context.Blocks.Add(block);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBlock), new { id = block.Id }, block);
    }
}