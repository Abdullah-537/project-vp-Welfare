using Microsoft.AspNetCore.Mvc;
using System.Linq;
using web.Data;

namespace web.Controllers
{
    public class InterfacesController : Controller
    {
        private readonly WelfareDb _context;

        public InterfacesController(WelfareDb context)
        {
            _context = context;
        }

        public IActionResult DonorDashboard()
        {
            // Get UserId as Int32 from session
            var userId = HttpContext.Session.GetInt32("UserId");
            var userType = HttpContext.Session.GetString("UserType");

            if (userId == null || userId == 0)
            {
                // User not logged in - redirect to login
                TempData["Error"] = "Please login first.";
                return RedirectToAction("Index", "UserLogin");
            }

            // Get user details from UserLoginConfidentials table
            var user = _context.UserLoginConfidentials
                .FirstOrDefault(u => u.UserId == userId.Value);

            // CRITICAL VERIFICATION: Check if user exists and UserType is "Donor"
            if (user == null)
            {
                // User not found in database
                HttpContext.Session.Clear();
                TempData["Error"] = "User not found.";
                return RedirectToAction("Index", "UserLogin");
            }

            if (!user.UserType.Trim().Equals("Donor", StringComparison.OrdinalIgnoreCase))
            {
                // User is NOT a donor - redirect to appropriate dashboard or login
                HttpContext.Session.Clear();
                TempData["Error"] = "Access denied. This page is only for donors.";
                return RedirectToAction("Index", "UserLogin");
            }

            // User is verified as Donor - Pass details to view
            ViewBag.UserName = user.FullName;
            ViewBag.UserId = user.UserId;
            ViewBag.FullName = user.FullName;
            ViewBag.Email = user.Email;
            ViewBag.Phone = user.Phone;
            ViewBag.CNIC = user.CNIC;
            ViewBag.DateOfBirth = user.DateOfBirth.ToString("dd MMM yyyy");
            ViewBag.Gender = user.Gender;
            ViewBag.Address = user.Address;
            ViewBag.City = user.City;

            return View();
        }
    }
}