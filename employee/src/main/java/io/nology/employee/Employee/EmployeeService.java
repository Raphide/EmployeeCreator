package io.nology.employee.Employee;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository repo;

    @Autowired
    private ModelMapper mapper;

    public Employee createEmployee(@Valid CreateEmployeeDTO data) {
        // Employee newEmployee = new Employee();
        // newEmployee.setFirstName(data.getFirstName().trim());
        // newEmployee.setMiddleName(data.getMiddleName().trim());
        // newEmployee.setLastName(data.getLastName().trim());
        // newEmployee.setBirthDate(data.getBirthDate());
        // newEmployee.setGender(data.getGender().trim());
        // newEmployee.setEmail(data.getEmail().trim());
        // newEmployee.setMobile(data.getMobile().trim());
        // newEmployee.setStreet(data.getStreet().trim());
        // newEmployee.setSuburb(data.getSuburb().trim());
        // newEmployee.setState(data.getState().trim());
        // newEmployee.setPostCode(data.getPostCode().trim());
        // newEmployee.setIsPermanent(data.getIsPermanent());
        // newEmployee.setIsFullTime(data.getIsFullTime());
        // newEmployee.setStartDate(data.getStartDate());
        // newEmployee.setFinishDate(data.getFinishDate());
        // newEmployee.setWeeklyHours(data.getWeeklyHours());
        Employee newEmployee = mapper.map(data, Employee.class);
        newEmployee.setIsArchived(false);
        return this.repo.save(newEmployee);
    }

    public List<Employee> findAll() {
        return this.repo.findAll();
    }

    public Optional<Employee> findById(Long id) {
        return this.repo.findById(id);
    }

    public Optional<Employee> archiveById(Long id) {
      Optional<Employee> result = this.findById(id);
      if(result.isEmpty()){
        return result;
      }
      Employee foundEmployee = result.get();
      foundEmployee.setIsArchived(!foundEmployee.getIsArchived());
      Employee updatedTodo = this.repo.save(foundEmployee);
      return Optional.of(updatedTodo);
    }

    public boolean deleteById(Long id) {
        Optional<Employee> result = this.findById(id);
        if(result.isEmpty()){
         return false;
        }
        this.repo.delete(result.get());
        return true;
     }

    public Optional<Employee> updateById(Long id, @Valid UpdateEmployeeDTO data) throws Exception {
      Optional<Employee> result = this.findById(id);
      if(result.isEmpty()){
        throw new Exception("Could not find employee with id " + id);
      }
      Employee foundEmployee = result.get();
      mapper.map(data, foundEmployee);
      Employee updatedEmployee = this.repo.save(foundEmployee);
      return Optional.of(updatedEmployee);
    }

}
