using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CsharpEmployee.Employee.DTOs
{
    public class CreateEmployeeDto
    {
        [Required(ErrorMessage = "First Name is required")]
        [StringLength(50, ErrorMessage = "First Name cannot be longer than 50 characters")]
        public required string FirstName { get; set; }
       
        [StringLength(50, ErrorMessage = "Middle Name cannot be longer than 50 characters")]
        public string? MiddleName { get; set; }
        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(50, ErrorMessage = "Last Name cannot be longer than 50 characters")]
        public required string LastName { get; set; }
    }
}