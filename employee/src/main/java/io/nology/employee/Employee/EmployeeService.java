package io.nology.employee.Employee;

import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.buf.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class EmployeeService {

  @Autowired
  EmployeeRepository repo;

  @Autowired
  private ModelMapper mapper;

  public String userCreator(String firstName, String lastName) {
    int fnLength = firstName.length() >= 3 ? 3 : 2;
    int lnLength = lastName.length() >= 3 ? 3 : 2;
    String newUser = firstName.replaceAll("[^a-zA-Z]", "").substring(0, fnLength).toLowerCase()
            + lastName.replaceAll("[^a-zA-Z]", "").substring(0, lnLength).toLowerCase();
    if (repo.existsByEmployeeUser(newUser)) {
        int number = 1;
        String idString = Integer.toString(number);
        newUser = newUser.concat(idString);
        while (repo.existsByEmployeeUser(newUser)) {
            String userArray[] = newUser.split("(?<=\\D)(?=\\d)");
            int idInt = Integer.valueOf(userArray[1]);
            idInt++;
            String newIdString = Integer.toString(idInt);
            userArray[1] = newIdString;
            newUser = String.join("", userArray);
        }
    }
    return newUser;
}

  public Employee createEmployee(@Valid CreateEmployeeDTO data) {
    Employee newEmployee = mapper.map(data, Employee.class);
    // int fnLength = data.getFirstName().length() >= 3 ? 3 : 2;
    // int lnLength = data.getLastName().length() >= 3 ? 3 : 2;
    // String newUser = data.getFirstName().replaceAll("[^a-zA-Z]", "").substring(0, fnLength).toLowerCase() + data.getLastName().replaceAll("[^a-zA-Z]", "").substring(0, lnLength).toLowerCase();
    // if (repo.existsByEmployeeUser(newUser)) {
    //   int number = 1;
    //   String idString = Integer.toString(number);
    //   newUser = newUser.concat(idString);
    //   while (repo.existsByEmployeeUser(newUser)) {
    //     String userArray[] = newUser.split("(?<=\\D)(?=\\d)");
    //     int idInt = Integer.valueOf(userArray[1]);
    //     idInt++;
    //     String newIdString = Integer.toString(idInt);
    //     userArray[1] = newIdString;
    //     newUser = String.join("", userArray);
    //   }
    // }
    newEmployee.setEmployeeUser(userCreator(newEmployee.getFirstName(), newEmployee.getLastName()));
    newEmployee.setEmployeeEmail();
    newEmployee.setIsArchived(false);
    return this.repo.save(newEmployee);
  }

  public List<Employee> findAll() {
    return this.repo.findAll();
  }

  public Page<Employee> findByPage(Pageable paging) {
   return this.repo.findAll(paging);
  }

  public List<Employee> findByTerm(String term) {
    return this.repo.findByTerm(term);
  }

  public Page<Employee> findByPageAndTerm(int page, String term) {
    Pageable paging = PageRequest.of(page, 10);
    List<Employee> employeeList = this.repo.findByTerm(term);
    int start = (int) paging.getOffset();
    int end = Math.min((start + paging.getPageSize()), employeeList.size());
    List<Employee> pageContent = employeeList.subList(start, end);
    return new PageImpl<>(pageContent, paging, employeeList.size());
   
  }

  public Optional<Employee> findById(Long id) {
    return this.repo.findById(id);
  }

  public Optional<Employee> archiveById(Long id) {
    Optional<Employee> result = this.findById(id);
    if (result.isEmpty()) {
      return result;
    }
    Employee foundEmployee = result.get();
    foundEmployee.setIsArchived(!foundEmployee.getIsArchived());
    Employee updatedTodo = this.repo.save(foundEmployee);
    return Optional.of(updatedTodo);
  }

  public boolean deleteById(Long id) {
    Optional<Employee> result = this.findById(id);
    if (result.isEmpty()) {
      return false;
    }
    this.repo.delete(result.get());
    return true;
  }

  public Optional<Employee> updateById(Long id, @Valid UpdateEmployeeDTO data) throws Exception {
    Optional<Employee> result = this.findById(id);
    if (result.isEmpty()) {
      throw new Exception("Could not find employee with id " + id);
    }
    Employee foundEmployee = result.get();
    mapper.map(data, foundEmployee);
    Employee updatedEmployee = this.repo.save(foundEmployee);
    return Optional.of(updatedEmployee);
  }

}
