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

        [MaybeNull]
        [MaxLength(50)]
        public string? MiddleName { get; set; }
        [Required]
        [MaxLength(50)]
        public required string LastName { get; set; }
        [Required]
        [MaxLength(10)]
        public required string Gender { get; set; }

        [MaybeNull]
        public DateOnly? BirthDate { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [MaxLength(20)]
        public required string Mobile { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Street { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Suburb { get; set; }

        [Required]
        [MaxLength(50)]
        public required string State { get; set; }

        [Required]
        [MaxLength(4)]
        public required string Postcode { get; set; }

        [Required]
        public bool IsPermanent { get; set; }

        [Required]
        public bool IsFullTime { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }
        public DateOnly? FinishDate { get; set; }

        [Required]
        public double WeeklyHours { get; set; }
        public string? EmployeeUser { get; set; }

        public string? EmployeeEmail { get; set; }

        public bool? IsArchived {get; set;}

    }
}