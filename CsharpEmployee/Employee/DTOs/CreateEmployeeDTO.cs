using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CsharpEmployee.Employee.DTOs
{
    public class CreateEmployeeDto
    {
        [Required(ErrorMessage = "First Name is required")]
        [StringLength(50, ErrorMessage = "First Name cannot be longer than 50 characters")]
        public required string FirstName { get; set; }

        [MaybeNull]
        [StringLength(50, ErrorMessage = "Middle Name cannot be longer than 50 characters")]
        public string? MiddleName { get; set; }
        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(50, ErrorMessage = "Last Name cannot be longer than 50 characters")]
        public required string LastName { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        [RegularExpression(@"^(male|female|nonbinary)$", ErrorMessage = "Gender must be male, female, or nonbinary")]
        public required string Gender { get; set; }

        [MaybeNull]
        public DateOnly? DateOfBirth { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Mobile number is required")]
        [RegularExpression(@"^\d+$", ErrorMessage = "Mobile number must contain only digits")]
        public required string Mobile { get; set; }

    }
}