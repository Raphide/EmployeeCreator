using Microsoft.EntityFrameworkCore;
using CsharpEmployee.Data;
using EmployeeEntity = CsharpEmployee.Employee.Entities.Employee;

namespace CsharpEmployee.Employee
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<EmployeeEntity> AddEmployeeAsync(EmployeeEntity employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<IEnumerable<EmployeeEntity>> GetEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<EmployeeEntity> GetByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task<EmployeeEntity> UpdateEmployee(EmployeeEntity employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return employee;
        }

        // public async Task<EmployeeEntity> UpdateEmployee(EmployeeEntity employee)
        // {
        //     var existingEmployee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == employee.Id);
        //     if (existingEmployee != null)
        //     {
        //         existingEmployee.FirstName = employee.FirstName;
        //         existingEmployee.MiddleName = employee.MiddleName;
        //         existingEmployee.LastName = employee.LastName;
        //         existingEmployee.Gender = employee.Gender;
        //         existingEmployee.DateOfBirth = employee.DateOfBirth;
        //         existingEmployee.Email = employee.Email;
        //         existingEmployee.Mobile = employee.Mobile;

        //         await _context.SaveChangesAsync();
        //         return existingEmployee;
        //     }

        //     return null;
        // }

        public async Task DeleteEmployee(int id)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (existingEmployee != null)
            {
                _context.Employees.Remove(existingEmployee);
                await _context.SaveChangesAsync();
            }
        }

        public bool ExistsByEmployeeUser(string newUser)
        {
            return _context.Employees.Any(e => e.EmployeeUser == newUser);
        }
    }
}