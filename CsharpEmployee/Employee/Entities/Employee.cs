using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CsharpEmployee.Employee.Entities {
    [Table("employees")]
    public class Employee {
        [Key]
        public int Id {get; set;}
        [Required]
        [MaxLength(50)]
        public required string Name {get; set; }
    }
}