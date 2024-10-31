using Microsoft.EntityFrameworkCore;
using CsharpEmployee.Data;
using EmployeeEntity = CsharpEmployee.Employee.Entities.Employee;

namespace CsharpEmployee.Employee {
    public class EmployeeRepository : IEmployeeRepository {
        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context) {
            _context = context;
        }
        public async Task<EmployeeEntity> AddEmployeeAsync(EmployeeEntity employee) {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<IEnumerable<EmployeeEntity>> GetEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }
    }
}