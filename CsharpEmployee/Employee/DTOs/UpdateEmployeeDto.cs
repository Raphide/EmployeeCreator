using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CsharpEmployee.Employee.DTOs
{
    public class UpdateEmployeeDto
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

                [Required(ErrorMessage = "Street is required")]
        [StringLength(100, ErrorMessage = "Street cannot be longer than 100 characters")]
        public required string Street {get; set;}

        [Required(ErrorMessage = "Suburb is required")]
        [StringLength(100, ErrorMessage = "Suburb cannot be longer than 100 characters")]
        public required string Suburb {get; set;}

        [Required(ErrorMessage = "State is required")]
        [StringLength(50, ErrorMessage = "State cannot be longer than 50 characters")]
        public required string State {get; set;}

        [Required(ErrorMessage = "Postcode is required")]
        [StringLength(4, ErrorMessage = "Postcode cannot be longer than 4 characters")]
        [RegularExpression(@"^\d+$", ErrorMessage = "Postcode must contain only digits")]
        public required string Postcode {get; set;}

    }
}