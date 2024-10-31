using EmployeeEntity = CsharpEmployee.Employee.Entities.Employee;

namespace CsharpEmployee.Employee {
    public interface IEmployeeRepository {
        Task<EmployeeEntity> AddEmployeeAsync(EmployeeEntity employee);
        Task<IEnumerable<EmployeeEntity>> GetEmployeesAsync();
    }
}