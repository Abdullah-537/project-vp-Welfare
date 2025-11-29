using Microsoft.AspNetCore.Mvc;

namespace web.Controllers
{
    public class DonorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
