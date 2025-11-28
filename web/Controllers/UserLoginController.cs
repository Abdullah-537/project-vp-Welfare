using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web.Data;
using web.Models;

namespace web.Controllers
{
    public class UserLoginController : Controller
    {
        private readonly WelfareDb _context;

        public UserLoginController(WelfareDb context)
        {
            _context = context;
        }

        // GET: show login page
        public IActionResult Index()
        {
            return View();
        }

        // POST: handle login for user / admin / ngo based on hidden LoginType
        [HttpPost]
        public async Task<IActionResult> Index(string LoginType, string UserID, string Password)
        {
            if (string.IsNullOrWhiteSpace(UserID) || string.IsNullOrWhiteSpace(Password))
            {
                ViewBag.Error = "Please provide both ID and password.";
                return View();
            }

            if (!int.TryParse(UserID, out var id))
            {
                ViewBag.Error = "ID must be a numeric 6-digit value.";
                return View();
            }

            LoginType = (LoginType ?? "user").ToLowerInvariant();

            switch (LoginType)
            {
                case "ngo":
                    var ngo = await _context.NGOsLogins.FindAsync(id);
                    if (ngo != null && ngo.PasswordHash == Password)
                    {
                        TempData["Success"] = "NGO login successful.";
                        return RedirectToAction("Index");
                    }
                    break;

                case "admin":
                    var admin = await _context.AdminLogins.FindAsync(id);
                    if (admin != null && admin.passwordHash == Password)
                    {
                        TempData["Success"] = "Admin login successful.";
                        return RedirectToAction("Index");
                    }
                    break;

                default: // user
                    var user = await _context.UserLoginConfidentials.FindAsync(id);
                    if (user != null && user.PasswordHash == Password)
                    {
                        TempData["Success"] = "User login successful.";
                        return RedirectToAction("Index");
                    }
                    break;
            }

            ViewBag.Error = "Invalid ID or password.";
            ModelState.AddModelError(string.Empty, "Invalid ID or password.");
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserLoginConfidentials loginConfidentials)
        {
            if (ModelState.IsValid)
            {
                if (_context.UserLoginConfidentials.Any(u => u.UserId == loginConfidentials.UserId))
                {
                    ModelState.AddModelError("User ID", "User ID already exists. Please choose a different one.");
                    return View(loginConfidentials);
                }
                if (_context.UserLoginConfidentials.Any(u => u.CNIC == loginConfidentials.CNIC))
                {
                    ModelState.AddModelError("CNIC", "CNIC already exists. Please choose a different one.");
                    return View(loginConfidentials);
                }

                await _context.UserLoginConfidentials.AddAsync(loginConfidentials);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Registration successful! Please login.";
                return RedirectToAction("Index");
            }
            return View(loginConfidentials);
        }
    }
}