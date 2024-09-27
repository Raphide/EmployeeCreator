package io.nology.employee.Employee;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.employee.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) throws Exception {
        Employee createdEmployee = this.employeeService.createEmployee(data);
        return new ResponseEntity<Employee>(createdEmployee, HttpStatus.CREATED);
    } 

    @GetMapping
    public ResponseEntity<List<Employee>> findAllEmployees(){
        List<Employee> employees = this.employeeService.findAll();
        return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
    }

    @GetMapping("/page={page}")
    public ResponseEntity<Page<Employee>> getPagedEmployees(@PathVariable int page) throws NotFoundException{
        Pageable paging = PageRequest.of(page, 10);
        Page<Employee> employees = this.employeeService.findByPage(paging);
        if(employees.isEmpty()){
            throw new NotFoundException("No more results");
        }
        return new ResponseEntity<Page<Employee>>(employees, HttpStatus.OK);
    }

    @GetMapping("/term={term}")
    public ResponseEntity<List<Employee>> getEmployeesByTerm(@PathVariable String term) throws NotFoundException{
        List<Employee> employees = this.employeeService.findByTerm(term);
        if(employees.isEmpty()){
            throw new NotFoundException("No results found");
        }
        return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
    }

    @GetMapping("/page={page}/term={term}")
    public ResponseEntity<Page<Employee>> getPagedEmployeesByTerm(@PathVariable int page, @PathVariable String term) throws NotFoundException{
        Page<Employee> employees = this.employeeService.findByPageAndTerm(page, term);
        if(employees.isEmpty()){
            throw new NotFoundException("No more results");
        }
        return new ResponseEntity<Page<Employee>>(employees, HttpStatus.OK);
    }

    @GetMapping("/page={page}/term={term}/archived={archived}")
    public ResponseEntity<Page<Employee>> getPagedEmployeesByTermAndArchivedStatus(@PathVariable int page, @PathVariable String term, @PathVariable Boolean archived) throws NotFoundException{
        Page<Employee> employees = this.employeeService.findByPageAndTermAndArchived(page, term, archived);
        if(employees.isEmpty()){
            throw new NotFoundException("No more results");
        }
        return new ResponseEntity<Page<Employee>>(employees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id) throws Exception {
        Optional<Employee> result = this.employeeService.findById(id);
        Employee foundEmployee = result.orElseThrow(() -> new NotFoundException("Could not find employee with id " + id));
        return new ResponseEntity<>(foundEmployee, HttpStatus.OK);
    }
  

    @PatchMapping("/{id}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable Long id, @Valid @RequestBody UpdateEmployeeDTO data) throws Exception {
        Optional<Employee> result = this.employeeService.updateById(id, data);
        Employee foundEmployee = result.orElseThrow(() -> new NotFoundException("Could not find employee with id " + id));
        return new ResponseEntity<>(foundEmployee, HttpStatus.OK);
    }

    @PatchMapping("/archive/{id}")
    public ResponseEntity<Employee> archiveEmployee(@PathVariable Long id) throws NotFoundException{
        Optional<Employee> result = this.employeeService.archiveById(id);
        Employee foundEmployee = result.orElseThrow(() -> new NotFoundException("Could not find employee with id " + id));
        return new ResponseEntity<>(foundEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeById(@PathVariable Long id) throws NotFoundException {
        boolean deleteSuccessful = this.employeeService.deleteById(id);
        if(deleteSuccessful == false) {
            throw new NotFoundException("Could not find Employee with id " + id);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
