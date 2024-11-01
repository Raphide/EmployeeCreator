using CsharpEmployee.Employee.DTOs;
using EmployeeEntity = CsharpEmployee.Employee.Entities.Employee;

namespace CsharpEmployee.Employee
{
    public class EmployeeService
    {
        private readonly IEmployeeRepository _repo;
        public EmployeeService(IEmployeeRepository repository)
        {
            _repo = repository;
        }

        public async Task<EmployeeEntity> CreateEmployeeAsync(CreateEmployeeDto data)
        {
            var employee = new EmployeeEntity
            {
                FirstName = data.FirstName,
                MiddleName = data.MiddleName,
                LastName = data.LastName,
                Gender = data.Gender,
                DateOfBirth = data.DateOfBirth,
                Email = data.Email,
                Mobile = data.Mobile
            };
            return await _repo.AddEmployeeAsync(employee);
        }

        internal async Task<IEnumerable<EmployeeEntity>> GetEmployees()
        {
            return await _repo.GetEmployeesAsync();
        }
    }
}