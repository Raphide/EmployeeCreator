package io.nology.employee.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    public boolean existsByEmployeeUser(String employeeUser);

}
