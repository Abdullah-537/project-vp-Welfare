using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    public class UserLoginConfidentials
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Range(100000, 999999, ErrorMessage = "UserId must be a 6-digit number.")]
        public int UserId { get; set; }

        public string UserType { get; set; } // Donor, Receiver

        public string CNIC { get; set; } // Primary login credential

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; } // Male, Female, Other, PreferNotToSay

        public string Address { get; set; }

        public string City { get; set; }


    }
}
