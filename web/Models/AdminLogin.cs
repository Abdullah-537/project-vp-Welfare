using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace web.Models
{
    public class AdminLogin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AdminId { get; set; }
        public string passwordHash { get; set; }
        public DateTime Dob { get; set; }
    }
}
