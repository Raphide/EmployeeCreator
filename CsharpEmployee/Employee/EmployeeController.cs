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
        public async Task<IActionResult> GetAllEmployees(){
            var employeeList = await _employeeService.GetEmployees();
            return Ok(employeeList);
        }
    }
}