using Microsoft.AspNetCore.Mvc;
using CsharpEmployee.Employee.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

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

            try
            {
                var newEmployee = await _employeeService.CreateEmployeeAsync(data);
                return StatusCode(201, newEmployee);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.FindAllAsync();
            return Ok(employees);
        }

        [HttpGet("term={term}")]
        public async Task<IActionResult> GetEmployeesByTerm([FromRoute] string term)
        {
            var employees = await _employeeService.FindByTermAsync(term);
            if (!employees.Any())
            {
                return NotFound("No results found");
            }
            return Ok(employees);
        }

        [HttpGet("go")]
        public async Task<IActionResult> GetPagedEmployees([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var employees = await _employeeService.FindByPageAsync(page, pageSize);
            return Ok(employees);
        }

        [HttpGet("page={page}/term={term}")]
        public async Task<IActionResult> GetPagedEmployeesByTerm([FromRoute] int page, [FromRoute] string term)
        {
            var employees = await _employeeService.FindByPageAndTermAsync(page, term, 10);
            if (!employees.Any())
            {
                return NotFound("No more results");
            }
            return Ok(employees);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetPagedEmployeesByTermAndArchivedStatus(
           [FromQuery] int page = 1,
           [FromQuery] string term = "",
           [FromQuery] bool archived = false)
        {
            var pagedResult = await _employeeService.FindByPageAndTermAndArchivedAsync(page + 1, 10, term, archived); // page + 1 to fix offset issue on front end. Has to be done on back end so Java version still works with front end. 
            if (pagedResult.Content.Count == 0)
            {
                return NotFound("No results found");
            }
            return Ok(pagedResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById([FromRoute] long id)
        {
            var employee = await _employeeService.FindByIdAsync(id);
            if (employee == null)
            {
                return NotFound($"Could not find employee with id {id}");
            }
            return Ok(employee);
        }


        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] long id, [FromBody] UpdateEmployeeDto data)
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

        [HttpPatch("archive/{id}")]
        public async Task<IActionResult> ArchiveEmployee([FromRoute] long id){
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedEmployee = await _employeeService.ArchiveById(id);
            if (updatedEmployee == null)
            {
                return NotFound("Employee not found.");
            }

            return Ok(updatedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] long id)
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


