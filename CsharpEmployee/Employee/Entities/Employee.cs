using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CsharpEmployee.Employee.Entities
{
    [Table("employees")]
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public required string FirstName { get; set; }
  
        [MaxLength(50)]
        public string? MiddleName { get; set; }
        [Required]
        [MaxLength(50)]
        public required string LastName { get; set; }
    }
}