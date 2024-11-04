using Microsoft.AspNetCore.Mvc;
using CsharpEmployee.Employee.DTOs;

namespace CsharpEmployee.Employee
{
    [ApiController]
    [Route("/employees")]
    public class EmployeeController(EmployeeService employeeService) : ControllerBase
    {
        private readonly EmployeeService _employeeService = employeeService;

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newEmployee = await _employeeService.CreateEmployeeAsync(data);
            return StatusCode(201, newEmployee);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employeeList = await _employeeService.GetEmployees();
            return Ok(employeeList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById([FromRoute] int id)
        {
            var foundEmployee = await _employeeService.FindEmployeeById(id);

            if (foundEmployee == null)
            {
                return NotFound("Employee not found.");
            }

            return Ok(foundEmployee);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] int id, [FromBody] UpdateEmployeeDto data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedEmployee = await _employeeService.UpdateEmployee(id, data);
            if (updatedEmployee == null)
            {
                return NotFound("Employee not found.");
            }

            return Ok(updatedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var success = await _employeeService.DeleteEmployeeAsync(id);
            if (!success)
            {
                return NotFound("Employee not found.");
            }

            return NoContent();
        }
    }
}


