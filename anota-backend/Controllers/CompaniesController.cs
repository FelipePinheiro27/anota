using anota_backend.Context;
using Microsoft.AspNetCore.Mvc;

namespace anota_backend.Controllers;

public class CompaniesController : Controller
{
    private readonly ContextData _context;

    public CompaniesController(ContextData context)
    {
        _context = context;
    }
}