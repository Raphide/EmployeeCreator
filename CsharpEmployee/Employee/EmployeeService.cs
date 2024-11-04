using CsharpEmployee.Employee.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<EmployeeEntity> FindEmployeeById(int id)
        {
            return await _repo.GetByIdAsync(id);
        }

        public async Task<IEnumerable<EmployeeEntity>> GetEmployees()
        {
            return await _repo.GetEmployeesAsync();
        }

        public async Task<EmployeeEntity> UpdateEmployee(int id, UpdateEmployeeDto data)
        {
            var existingEmployee = await _repo.GetByIdAsync(id);
            if (existingEmployee == null)
            {
                return null;
            }

            existingEmployee.FirstName = data.FirstName;
            existingEmployee.MiddleName = data.MiddleName;
            existingEmployee.LastName = data.LastName;
            existingEmployee.Gender = data.Gender;
            existingEmployee.DateOfBirth = data.DateOfBirth;
            existingEmployee.Email = data.Email;
            existingEmployee.Mobile = data.Mobile;

            return await _repo.UpdateEmployee(existingEmployee);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var existingEmployee = await _repo.GetByIdAsync(id);
            if (existingEmployee == null)
            {
                return false;
            }

            await _repo.DeleteEmployee(id);
            return true;
        }
    }
}