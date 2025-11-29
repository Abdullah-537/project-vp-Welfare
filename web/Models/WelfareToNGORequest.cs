using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    public class WelfareToNGORequest
    {
        [Key]
        public int RequestId { get; set; }

        [ForeignKey("AdminLogin")]
        public int AdminId { get; set; }
        public virtual AdminLogin Admin { get; set; }

        [ForeignKey("NGOsLogin")]
        public int NgoId { get; set; }
        public virtual NGOsLogin Ngo { get; set; }

        [Required]
        public string RequestType { get; set; } // Financial, Clothes, Food, Volunteers, Shelter

        [Required]
        public string Description { get; set; }

        [Range(0, double.MaxValue)]
        public decimal RequestedAmount { get; set; }

        // For Food Requests
        public int? FoodQuantity { get; set; }
        public string FoodUnit { get; set; }

        // For Clothes Requests
        public int? MaleClothesQuantity { get; set; }
        public int? FemaleClothesQuantity { get; set; }
        public int? KidsClothesQuantity { get; set; }

        // For Shelter Requests
        public int? ShelterBeds { get; set; }

        public string Status { get; set; } // Pending, Accepted, Rejected, Fulfilled

        public DateTime RequestDate { get; set; }

        public DateTime? ResponseDate { get; set; }

        public string NgoResponse { get; set; }

        // Fulfilled amounts
        public decimal? FulfilledAmount { get; set; }
        public int? FulfilledFoodQuantity { get; set; }
        public int? FulfilledMaleClothes { get; set; }
        public int? FulfilledFemaleClothes { get; set; }
        public int? FulfilledKidsClothes { get; set; }
        public int? FulfilledShelterBeds { get; set; }

        public DateTime? FulfilledDate { get; set; }
    }
}