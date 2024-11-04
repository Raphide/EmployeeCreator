using EmployeeEntity = CsharpEmployee.Employee.Entities.Employee;

namespace CsharpEmployee.Employee
{
    public interface IEmployeeRepository
    {
        Task<EmployeeEntity> AddEmployeeAsync(EmployeeEntity employee);
        Task<IEnumerable<EmployeeEntity>> GetEmployeesAsync();
        Task<EmployeeEntity> GetByIdAsync(int id);
        Task<EmployeeEntity> UpdateEmployee(EmployeeEntity employee);
        Task DeleteEmployee(int id); 
        bool ExistsByEmployeeUser(string newUser);
    }
}