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

        // public async Task<IEnumerable<EmployeeEntity>> GetEmployeesAsync()
        // {
        //     return await _context.Employees.ToListAsync();
        // }

        // public async Task<EmployeeEntity> GetByIdAsync(int id)
        // {
        //     return await _context.Employees.FindAsync(id);
        // }

        public async Task<IEnumerable<EmployeeEntity>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<PagedResult<EmployeeEntity>> GetPageAsync(int page, int pageSize)
        {
            var totalCount = await _context.Employees.CountAsync();
            var items = await _context.Employees
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<EmployeeEntity>(items, totalCount, page, pageSize);
        }

        public async Task<IEnumerable<EmployeeEntity>> SearchByTermAsync(string term)
        {
            return await _context.Employees
                .Where(e => EF.Functions.Like(e.FirstName, $"%{term}%")
                            || EF.Functions.Like(e.MiddleName, $"%{term}%")
                            || EF.Functions.Like(e.LastName, $"%{term}%"))
                .OrderBy(e => e.LastName)
                .ToListAsync();
        }

        public async Task<IEnumerable<EmployeeEntity>> GetPageByTermAsync(int page, string term, int pageSize)
        {
            return await _context.Employees
                .Where(e => EF.Functions.Like(e.FirstName, $"%{term}%")
                            || EF.Functions.Like(e.MiddleName, $"%{term}%")
                            || EF.Functions.Like(e.LastName, $"%{term}%"))
                .OrderBy(e => e.LastName)
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<PagedResult<EmployeeEntity>> GetEmployeesPagedFilteredAsync(
    int pageNumber, int pageSize, string term, bool archived)
        {
            var query = _context.Employees.AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(term))
            {
                query = query.Where(e =>
                    e.FirstName.Contains(term) ||
                    e.LastName.Contains(term) ||
                    e.Email.Contains(term));
            }

            query = query.Where(e => e.IsArchived == archived);

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<EmployeeEntity>(items, totalCount, pageNumber, pageSize);
        }
        public async Task<EmployeeEntity> GetByIdAsync(long id)
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

        public async Task DeleteEmployee(long id)
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