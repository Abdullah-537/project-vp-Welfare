using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    public class Donation
    {
        [Key]
        public int DonationId { get; set; }

        public string DonorType { get; set; } // User, NGO

        [ForeignKey("UserLoginConfidentials")]
        public int? DonorUserId { get; set; }
        public virtual UserLoginConfidentials DonorUser { get; set; }

        [ForeignKey("NGOsLogin")]
        public int? DonorNgoId { get; set; }
        public virtual NGOsLogin DonorNgo { get; set; }

        [Required]
        public string DonationType { get; set; } // Money, Clothes, Food, Shelter

        [Range(0, double.MaxValue)]
        public decimal MonetaryAmount { get; set; }

        public DateTime DonationDate { get; set; }

        // For Food Donations
        public int? FoodQuantity { get; set; } // Number of ration units donated
        public string FoodUnit { get; set; } // rations, kg, packages
        public string FoodDescription { get; set; }

        // For Clothes Donations
        public int? MaleClothesQuantity { get; set; }
        public int? FemaleClothesQuantity { get; set; }
        public int? KidsClothesQuantity { get; set; }
        public string ClothesSize { get; set; } // S, M, L, XL, XXL
        public string ClothesType { get; set; } // Winter, Summer, Formal, Casual
        public string ClothesDescription { get; set; }

        // For Shelter Donations (contribution to shelter maintenance/capacity)
        public int? ShelterBeds { get; set; }
        public string ShelterDescription { get; set; }

        // General description for all types
        public string ItemDescription { get; set; }
    }
}