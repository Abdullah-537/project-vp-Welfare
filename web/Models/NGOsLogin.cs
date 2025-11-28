using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    public class NGOsLogin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Range(100000, 999999, ErrorMessage = "NgoId must be a 6-digit number.")]
        public int NgoId { get; set; }

        public string OrganizationName { get; set; }

        public string Email { get; set; } // Unique index via Fluent API

        public string PasswordHash { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public string City { get; set; }


    }
}
