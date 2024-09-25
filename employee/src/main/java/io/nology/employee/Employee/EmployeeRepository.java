package io.nology.employee.Employee;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    public boolean existsByEmployeeUser(String employeeUser);

    @Query("SELECT e FROM Employee e WHERE e.firstName LIKE %?1% OR e.middleName LIKE %?1% OR e.lastName LIKE %?1%")
    List<Employee> findByTerm(String term);
}
