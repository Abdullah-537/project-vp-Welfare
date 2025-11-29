using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    public class DonorToWelfareTransaction
    {
        [Key]
        public int TransactionId { get; set; }

        [ForeignKey("UserLoginConfidentials")]
        public int DonorUserId { get; set; }
        public virtual UserLoginConfidentials Donor { get; set; }

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

        public string ItemDescription { get; set; }

        // Balance after this transaction
        public decimal WelfareBalanceAfter { get; set; }
        public int? FoodInventoryAfter { get; set; }
        public int? MaleClothesInventoryAfter { get; set; }
        public int? FemaleClothesInventoryAfter { get; set; }
        public int? KidsClothesInventoryAfter { get; set; }
    }
}