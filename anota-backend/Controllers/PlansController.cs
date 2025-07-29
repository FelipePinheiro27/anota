using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using anota_backend.Context;
using anota_backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace anota_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly ContextData _context;

        public PlansController(ContextData context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanModel>>> GetPlans()
        {
            return await _context.Plans.Where(p => p.IsActive).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlanModel>> GetPlan(int id)
        {
            var plan = await _context.Plans.FindAsync(id);

            if (plan == null)
            {
                return NotFound();
            }

            return plan;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<PlanModel>> CreatePlan([FromBody] PlanModel plan)
        {
            try
            {
                _context.Plans.Add(plan);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetPlan), new { id = plan.Id }, plan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] PlanModel plan)
        {
            if (id != plan.Id)
            {
                return BadRequest();
            }

            _context.Entry(plan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _context.Plans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            plan.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlanExists(int id)
        {
            return _context.Plans.Any(e => e.Id == id);
        }
    }
} 