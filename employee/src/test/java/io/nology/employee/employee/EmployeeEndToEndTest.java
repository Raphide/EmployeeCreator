package io.nology.employee.employee;

import java.util.Date;

import static io.restassured.RestAssured.given;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import static org.hamcrest.Matchers.*;

import io.nology.employee.Employee.CreateEmployeeDTO;
import io.nology.employee.Employee.Employee;
import io.nology.employee.Employee.EmployeeRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class EmployeeEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private EmployeeRepository employeeRepository;

    Long employeeId;

    public String userCreator(String firstName, String lastName) {
        int fnLength = firstName.length() >= 3 ? 3 : 2;
        int lnLength = lastName.length() >= 3 ? 3 : 2;
        String newUser = firstName.replaceAll("[^a-zA-Z]", "").substring(0, fnLength).toLowerCase()
                + lastName.replaceAll("[^a-zA-Z]", "").substring(0, lnLength).toLowerCase();
        if (employeeRepository.existsByEmployeeUser(newUser)) {
            int number = 1;
            String idString = Integer.toString(number);
            newUser = newUser.concat(idString);
            while (employeeRepository.existsByEmployeeUser(newUser)) {
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

    // Date date1 = new Date(1983 - 07 - 17);
    // Date date2 = new Date(1992 - 9 - 27);
    // Date date3 = new Date(2020 - 03 - 14);
    // Date date4 = new Date(2025 - 11 - 29);

    


    @BeforeEach
    public void setup() {
        RestAssured.port = port;
        employeeRepository.deleteAll();

        Employee employee1 = new Employee();
  

        employee1.setFirstName("Cheryl");
        employee1.setMiddleName("Heather");
        employee1.setLastName("Mason");
        // employee1.setBirthDate(date1);
        employee1.setGender("female");
        employee1.setMobile("0440404040");
        employee1.setEmail("test@test.com");
        employee1.setStreet("123 fake st");
        employee1.setSuburb("Silent Hill");
        employee1.setState("NSW");
        employee1.setPostCode("2000");
        employee1.setEmployeeUser(userCreator(employee1.getFirstName(), employee1.getLastName()));
        employee1.setEmployeeEmail();
        // employee1.setStartDate(date2);
        // employee1.setFinishDate(date3);
        employee1.setIsFullTime(false);
        employee1.setIsPermanent(true);
        employee1.setWeeklyHours(20);
        employee1.setIsArchived(false);
        employeeRepository.save(employee1);
        employeeId = employee1.getId();

        Employee employee2 = new Employee();
        employee2.setFirstName("Squidward");
        employee2.setMiddleName(null);
        employee2.setLastName("Tentacles");
        // employee2.setBirthDate(date2);
        employee2.setGender("male");
        employee2.setMobile("0440404040");
        employee2.setEmail("test@test.com");
        employee2.setStreet("123 fake st");
        employee2.setSuburb("FakesVille");
        employee2.setState("NSW");
        employee2.setPostCode("2000");
        employee2.setEmployeeUser(userCreator(employee2.getFirstName(), employee2.getLastName()));
        employee2.setEmployeeEmail();
        // employee2.setStartDate(date3);
        // employee2.setFinishDate(date4);
        employee2.setIsFullTime(true);
        employee2.setIsPermanent(false);
        employee2.setWeeklyHours(36);
        employee1.setIsArchived(false);
        employeeRepository.save(employee2);
    }

    @Test
    public void getAllEmployees() {
        given().when().get("/employees").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2))
                .body("firstName", hasItems("Cheryl", "Squidward")).body("middleName", hasItems("Heather", null))
                .body("lastName", hasItems("Mason", "Tentacles")).body("employeeUser", hasItems("chemas", "squten"))
                .body("employeeEmail", hasItems("chemas@company.com", "squten@company.com"));
    }

    @Test
    public void getEmployeeById() {
        given().when().get("employees/{id}", employeeId).then().statusCode(HttpStatus.OK.value())
                .body("firstName", equalTo("Cheryl")).body("suburb", equalTo("Silent Hill"));
    }

    @Test
    public void createEmployee_success() {
        CreateEmployeeDTO data = new CreateEmployeeDTO();
        data.setFirstName("Greg");
        data.setMiddleName("Greggor");
        data.setLastName("Gregson");
        // data.setBirthDate(date1);
        data.setGender("nonbinary");
        data.setMobile("0440404040");
        data.setEmail("test@test.com");
        data.setStreet("57 Greg lane");
        data.setSuburb("Gregstown");
        data.setState("WA");
        data.setPostCode("3050");
        // data.setStartDate(date2);
        // data.setFinishDate(date3);
        data.setIsFullTime(false);
        data.setIsPermanent(false);
        data.setWeeklyHours(40);
        given().contentType(ContentType.JSON).body(data).when().post("/employees").then()
                .statusCode(HttpStatus.CREATED.value()).body("firstName", equalTo("Greg"))
                .body("gender", equalTo("nonbinary")).body("street", equalTo("57 Greg lane"))
                .body("id", notNullValue());

        given().when().get("/employees").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(3))
                .body("middleName", hasItems("Heather", null, "Greggor"))
                .body("isFullTime", hasItems(true, true, false)).body("employeeUser", hasItems("chemas", "squten", "gregre"));
    }

}
