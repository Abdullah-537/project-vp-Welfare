using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    public class WelfareToReceiverTransaction
    {
        [Key]
        public int TransactionId { get; set; }

        [ForeignKey("ReceiverRequest")]
        public int RequestId { get; set; }
        public virtual ReceiverRequest Request { get; set; }

        [ForeignKey("UserLoginConfidentials")]
        public int ReceiverId { get; set; }
        public virtual UserLoginConfidentials Receiver { get; set; }

        [ForeignKey("AdminLogin")]
        public int ApprovedByAdminId { get; set; }
        public virtual AdminLogin ApprovedByAdmin { get; set; }

        [Required]
        public string TransactionType { get; set; } // Food, Clothes, Loan, Shelter

        public DateTime TransactionDate { get; set; }

        // For Money/Loan Transactions
        [Range(0, double.MaxValue)]
        public decimal MonetaryAmount { get; set; }

        // For Food Distribution
        public int? FamilyMembers { get; set; }
        public int? FoodQuantityGiven { get; set; }
        public string FoodUnit { get; set; }

        // For Clothes Distribution
        public int? MaleClothesGiven { get; set; }
        public int? FemaleClothesGiven { get; set; }
        public int? KidsClothesGiven { get; set; }
        public string ClothesSize { get; set; }
        public string ClothesType { get; set; }

        // For Shelter
        public int? ShelterDays { get; set; }
        public int? RoomsAllocated { get; set; }

        public string Description { get; set; }

        // Balance after this transaction
        public decimal WelfareBalanceAfter { get; set; }
        public int? FoodInventoryAfter { get; set; }
        public int? MaleClothesInventoryAfter { get; set; }
        public int? FemaleClothesInventoryAfter { get; set; }
        public int? KidsClothesInventoryAfter { get; set; }
    }
}