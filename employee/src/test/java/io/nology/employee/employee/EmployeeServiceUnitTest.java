package io.nology.employee.employee;

import static io.restassured.RestAssured.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;

import org.assertj.core.util.DateUtil;
import org.h2.mvstore.type.DataType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import io.nology.employee.Employee.CreateEmployeeDTO;
import io.nology.employee.Employee.Employee;
import io.nology.employee.Employee.EmployeeRepository;
import io.nology.employee.Employee.EmployeeService;
import io.restassured.internal.common.assertion.Assertion;

public class EmployeeServiceUnitTest {

    @Mock
    private EmployeeRepository repo;

    @Mock
    private ModelMapper mapper;

    // @Mock
    // Pageable paging;

    @Spy
    @InjectMocks
    private EmployeeService service;

   

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void findAll() {
        service.findAll();
        verify(repo).findAll();
    }

    @Test
    public void findByPage() {
        Pageable paging = PageRequest.of(0, 10);
        service.findByPage(paging);
        verify(repo).findAll(paging);
    }

    @Test
    public void findByTerm() {
        String term = "hi";
        service.findByTerm(term);
        verify(repo).findByTerm(term);
    }

    @Test
    public void findById() {
        Long employeeId = 1L;
        service.findById(employeeId);
        verify(repo).findById(employeeId);
    }

    @Test
    public void archiveById() {
        Long employeeId = 1L;
        Employee mockEmployee = new Employee();
        mockEmployee.setIsArchived(false);
        Optional<Employee> result = Optional.of(mockEmployee);
        when(service.archiveById(employeeId)).thenReturn(result);
        Employee archivedEmployee = result.get();
        archivedEmployee.setIsArchived(!archivedEmployee.getIsArchived());
        repo.save(archivedEmployee);
        assertEquals(archivedEmployee.getIsArchived(), true);
        verify(repo).save(archivedEmployee);
    }

    @Test
    public void userCreator() {
        Employee mockEmployee = new Employee();
        mockEmployee.setFirstName("Daryl");
        mockEmployee.setLastName("Jacobs");
        when(service.userCreator(mockEmployee.getFirstName(), mockEmployee.getLastName())).thenReturn("darjac");
    }

    // @Test
    // public void createEmployee() throws Exception {
    //     Date date1 = new Date();
    //     CreateEmployeeDTO data = new CreateEmployeeDTO();
    //     Employee mockEmployee = new Employee();
    //     data.setFirstName("Greg");
    //     data.setMiddleName("Greggor");
    //     data.setLastName("Gregson");
    //     data.setBirthDate(date1);
    //     data.setGender("nonbinary");
    //     data.setMobile("0440404040");
    //     data.setEmail("test@test.com");
    //     data.setStreet("57 Greg lane");
    //     data.setSuburb("Gregstown");
    //     data.setState("WA");
    //     data.setPostCode("3050");
    //     data.setIsFullTime(true);
    //     data.setIsPermanent(false);
    //     data.setStartDate(date1);
    //     data.setFinishDate(date1);
    //     data.setWeeklyHours(40);
    //     when(mapper.map(data, Employee.class)).thenReturn(mockEmployee);
    //     when(repo.save(any(Employee.class))).thenReturn(mockEmployee);
    //     Employee employeeResult = service.createEmployee(data);
    //     assertNotNull(employeeResult);
    //     assertEquals(mockEmployee, employeeResult);
    //     verify(repo).save(mockEmployee);
    // }

}
