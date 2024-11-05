using EmployeeEntity = CsharpEmployee.Employee.Entities.Employee;

namespace CsharpEmployee.Employee
{
    public interface IEmployeeRepository
    {
        Task<EmployeeEntity> AddEmployeeAsync(EmployeeEntity employee);
        // Task<IEnumerable<EmployeeEntity>> GetEmployeesAsync();
        // Task<EmployeeEntity> GetByIdAsync(int id);
        Task<IEnumerable<EmployeeEntity>> GetAllAsync();
        Task<PagedResult<EmployeeEntity>> GetPageAsync(int page, int pageSize);
        Task<IEnumerable<EmployeeEntity>> SearchByTermAsync(string term);
        Task<IEnumerable<EmployeeEntity>> GetPageByTermAsync(int page, string term, int pageSize);
        Task<PagedResult<EmployeeEntity>> GetEmployeesPagedFilteredAsync(
        int pageNumber, int pageSize, string term, bool archived);        Task<EmployeeEntity> GetByIdAsync(long id);
        Task<EmployeeEntity> UpdateEmployee(EmployeeEntity employee);
        Task DeleteEmployee(int id);
        bool ExistsByEmployeeUser(string newUser);
    }
}