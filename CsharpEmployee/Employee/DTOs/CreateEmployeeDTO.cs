using System.ComponentModel.DataAnnotations;

namespace CsharpEmployee.Employee.DTOs {
    public class CreateEmployeeDto {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters")]
        public required string Name {get; set;}
    }
}