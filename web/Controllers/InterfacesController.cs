using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using web.Data;
using web.Models;

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

            // Load donation history
            ViewBag.DonationHistory = GetDonationHistory(userId.Value);

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> DonateFoodAction(int NumberOfPeople, string FoodType,
            string Description, string PickupLocation, DateTime PickupDateTime)
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
            {
                return RedirectToAction("Index", "UserLogin");
            }

            // Create food donation transaction
            var transaction = new DonorToWelfareTransaction
            {
                DonorUserId = userId.Value,
                DonationType = "Food",
                DonationDate = DateTime.Now,
                FoodQuantity = NumberOfPeople,
                FoodUnit = "People",
                FoodDescription = $"{FoodType} - {Description}\nPickup: {PickupLocation} at {PickupDateTime:dd MMM yyyy hh:mm tt}",
                ItemDescription = $"Food for {NumberOfPeople} people",
                MonetaryAmount = 0 // No monetary amount for food donation
            };

            _context.DonorToWelfareTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Food donation submitted successfully! We'll contact you soon for pickup.";
            return RedirectToAction("DonorDashboard");
        }

        [HttpPost]
        public async Task<IActionResult> DonateClothesAction(string Category, int Quantity,
            string Condition, string ClothesType, string Description, string PickupLocation, DateTime PickupDateTime)
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
            {
                return RedirectToAction("Index", "UserLogin");
            }

            // Create clothes donation transaction
            var transaction = new DonorToWelfareTransaction
            {
                DonorUserId = userId.Value,
                DonationType = "Clothes",
                DonationDate = DateTime.Now,
                ClothesType = ClothesType ?? "General",
                ClothesDescription = $"{Description}\nCondition: {Condition}\nPickup: {PickupLocation} at {PickupDateTime:dd MMM yyyy hh:mm tt}",
                ItemDescription = $"{Quantity} {Category} clothes items",
                MonetaryAmount = 0
            };

            // Set category-specific quantities
            switch (Category)
            {
                case "Kids":
                    transaction.KidsClothesQuantity = Quantity;
                    break;
                case "Male":
                    transaction.MaleClothesQuantity = Quantity;
                    break;
                case "Female":
                    transaction.FemaleClothesQuantity = Quantity;
                    break;
            }

            _context.DonorToWelfareTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Clothes donation of {Quantity} {Category} items submitted successfully!";
            return RedirectToAction("DonorDashboard");
        }

        [HttpPost]
        public async Task<IActionResult> DonateMoneyAction(decimal Amount, string Purpose,
            string PaymentMethod, string Comments)
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
            {
                return RedirectToAction("Index", "UserLogin");
            }

            // Create money donation transaction
            var transaction = new DonorToWelfareTransaction
            {
                DonorUserId = userId.Value,
                DonationType = "Money",
                MonetaryAmount = Amount,
                DonationDate = DateTime.Now,
                ItemDescription = $"{Purpose} - {PaymentMethod}",
                FoodDescription = Comments // Using FoodDescription field for comments
            };

            _context.DonorToWelfareTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            TempData["Success"] = $"Money donation of PKR {Amount:N0} for {Purpose} submitted successfully!";
            return RedirectToAction("DonorDashboard");
        }

        private List<dynamic> GetDonationHistory(int userId)
        {
            var transactions = _context.DonorToWelfareTransactions
                .Where(t => t.DonorUserId == userId)
                .OrderByDescending(t => t.DonationDate)
                .ToList();

            var history = new List<dynamic>();

            foreach (var t in transactions)
            {
                string description = "";
                string details = "";
                string status = "Completed"; // You can add a Status field to the model if needed

                switch (t.DonationType)
                {
                    case "Food":
                        description = $"{t.FoodQuantity ?? 0} {t.FoodUnit ?? "people"}";
                        details = t.FoodDescription ?? "";
                        break;

                    case "Clothes":
                        int totalClothes = (t.MaleClothesQuantity ?? 0) +
                                         (t.FemaleClothesQuantity ?? 0) +
                                         (t.KidsClothesQuantity ?? 0);
                        string clothesBreakdown = "";
                        if (t.MaleClothesQuantity > 0) clothesBreakdown += $"Male: {t.MaleClothesQuantity} ";
                        if (t.FemaleClothesQuantity > 0) clothesBreakdown += $"Female: {t.FemaleClothesQuantity} ";
                        if (t.KidsClothesQuantity > 0) clothesBreakdown += $"Kids: {t.KidsClothesQuantity}";

                        description = $"{totalClothes} items - {clothesBreakdown.Trim()}";
                        details = t.ClothesType ?? "General";
                        break;

                    case "Money":
                        description = $"PKR {t.MonetaryAmount:N0}";
                        details = t.ItemDescription ?? "";
                        break;

                    case "Shelter":
                        description = $"{t.ShelterBeds ?? 0} beds";
                        details = t.ShelterDescription ?? "";
                        break;

                    default:
                        description = t.ItemDescription ?? "";
                        details = "";
                        break;
                }

                history.Add(new
                {
                    Date = t.DonationDate.ToString("dd MMM yyyy"),
                    Type = t.DonationType,
                    Description = description,
                    Status = status,
                    Details = details
                });
            }

            return history;
        }
    }
}