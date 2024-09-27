package io.nology.employee.employee;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import io.nology.employee.Employee.CreateEmployeeDTO;
import io.nology.employee.Employee.Employee;
import io.nology.employee.Employee.EmployeeRepository;
import io.nology.employee.Employee.EmployeeService;
import io.nology.employee.common.exceptions.ServiceValidationException;


public class EmployeeServiceUnitTest {

    @Mock
    private EmployeeRepository repo;

    @Mock
    private ModelMapper mapper;

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
    public void userCreator_success() {
        Employee mockEmployee = new Employee();
        String existingUser = "darjac";
        Boolean doesExist = repo.existsByEmployeeUser(existingUser);
        when(repo.existsByEmployeeUser(existingUser)).thenReturn(false);
        assertEquals(false, doesExist);
        mockEmployee.setFirstName("Daryl");
        mockEmployee.setLastName("Jacobs");
        String userName = service.userCreator(mockEmployee.getFirstName(), mockEmployee.getLastName());
        assertEquals(userName, "darjac");
    }

    @Test
    public void userCreator_alreadyExists_success() {
        Employee mockEmployee = new Employee();
        String existingUser = "darjac";
        when(repo.existsByEmployeeUser(existingUser)).thenReturn(true);
        mockEmployee.setFirstName("Daryl");
        mockEmployee.setLastName("Jacobs");
        String userName = service.userCreator(mockEmployee.getFirstName(), mockEmployee.getLastName());
        assertEquals(userName, "darjac1");
    }

    @Test
    public void userCreator_twoCharName_success() {
        Employee mockEmployee = new Employee();
        mockEmployee.setFirstName("Da");
        mockEmployee.setLastName("Vie");
        String userName = service.userCreator(mockEmployee.getFirstName(), mockEmployee.getLastName());
        assertEquals(userName, "davie");
    }

    @Test
    public void userCreator_nonCharName_success() {
        Employee mockEmployee = new Employee();
        mockEmployee.setFirstName("Sandy");
        mockEmployee.setLastName("O'Niel");
        String userName = service.userCreator(mockEmployee.getFirstName(), mockEmployee.getLastName());
        assertEquals(userName, "sanoni");
    }

    @Test
    public void createEmployee() throws Exception {
        Date date1 = new Date();
        CreateEmployeeDTO mockDTO = new CreateEmployeeDTO();
        Employee newEmployee = new Employee();
        mockDTO.setFirstName("Greg");
        mockDTO.setMiddleName("Greggor");
        mockDTO.setLastName("Gregson");
        mockDTO.setBirthDate(date1);
        mockDTO.setGender("nonbinary");
        mockDTO.setMobile("0440404040");
        mockDTO.setEmail("test@test.com");
        mockDTO.setStreet("57 Greg lane");
        mockDTO.setSuburb("Gregstown");
        mockDTO.setState("WA");
        mockDTO.setPostCode("3050");
        mockDTO.setIsFullTime(true);
        mockDTO.setIsPermanent(false);
        mockDTO.setStartDate(date1);
        mockDTO.setFinishDate(date1);
        mockDTO.setWeeklyHours(40);
        when(mapper.map(mockDTO, Employee.class)).thenReturn(newEmployee);
        when(repo.save(any(Employee.class))).thenReturn(newEmployee);
        newEmployee.setFirstName(mockDTO.getFirstName());
        newEmployee.setLastName(mockDTO.getLastName());
        Employee employeeResult = service.createEmployee(mockDTO);
        assertNotNull(employeeResult);
        assertEquals(newEmployee, employeeResult);
        verify(repo).save(newEmployee);
    }

    @Test
    public void createEmployee_missingFirstName_failure() throws Exception {
        Date date1 = new Date();
        CreateEmployeeDTO mockDTO = new CreateEmployeeDTO();
        Employee newEmployee = new Employee();
        mockDTO.setMiddleName("Greggor");
        mockDTO.setLastName("Gregson");
        mockDTO.setBirthDate(date1);
        mockDTO.setGender("nonbinary");
        mockDTO.setMobile("0404000444");
        mockDTO.setEmail("test@test.com");
        mockDTO.setStreet("57 Greg lane");
        mockDTO.setSuburb("Gregstown");
        mockDTO.setState("WA");
        mockDTO.setPostCode("3050");
        mockDTO.setIsFullTime(true);
        mockDTO.setIsPermanent(false);
        mockDTO.setStartDate(date1);
        mockDTO.setFinishDate(date1);
        mockDTO.setWeeklyHours(40);
        when(mapper.map(mockDTO, Employee.class)).thenReturn(newEmployee);
        assertThrows(NullPointerException.class, () -> service.createEmployee(mockDTO));
        verify(repo, never()).save(any());
    }

    @Test
    public void createEmployee_tooShortFirstName_failure() throws Exception {
        Date date1 = new Date();
        CreateEmployeeDTO mockDTO = new CreateEmployeeDTO();
        Employee newEmployee = new Employee();
        mockDTO.setFirstName("G");
        mockDTO.setMiddleName("Greggor");
        mockDTO.setLastName("Gregson");
        mockDTO.setBirthDate(date1);
        mockDTO.setGender("nonbinary");
        mockDTO.setMobile("0404000444");
        mockDTO.setEmail("test@test.com");
        mockDTO.setStreet("57 Greg lane");
        mockDTO.setSuburb("Gregstown");
        mockDTO.setState("WA");
        mockDTO.setPostCode("3050");
        mockDTO.setIsFullTime(true);
        mockDTO.setIsPermanent(false);
        mockDTO.setStartDate(date1);
        mockDTO.setFinishDate(date1);
        mockDTO.setWeeklyHours(40);
        when(mapper.map(mockDTO, Employee.class)).thenReturn(newEmployee);
        assertThrows(ServiceValidationException.class, () -> service.createEmployee(mockDTO));
        verify(repo, never()).save(any());
    }

    @Test
    public void deleteById_success(){
        Long EmployeeId = 1L;
        Employee mockEmployee = new Employee();
        Optional<Employee> result = Optional.of(mockEmployee);
        when(repo.findById(EmployeeId)).thenReturn(result);
        Boolean isDeleted = service.deleteById(EmployeeId);
        assertEquals(true, isDeleted);
        verify(repo).delete(mockEmployee);
    }

    @Test
    public void deleteById_failure(){
        Long employeeId = 100L;
        Optional<Employee> result = Optional.empty();
        when(repo.findById(employeeId)).thenReturn(result);
        Boolean isDeleted = service.deleteById(employeeId);
        assertEquals(false, isDeleted);
        verify(repo, never()).delete(any());
    }

}
