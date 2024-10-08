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

    Date date1 = new Date();
    // Date date2 = new Date();
    // Date date3 = new Date();
    // Date date4 = new Date();

    @BeforeEach
    public void setup() {
        RestAssured.port = port;
        employeeRepository.deleteAll();

        Employee employee1 = new Employee();
        employee1.setFirstName("Cheryl");
        employee1.setMiddleName("Heather");
        employee1.setLastName("Mason");
        employee1.setBirthDate(date1);
        employee1.setGender("female");
        employee1.setMobile("0440404040");
        employee1.setEmail("test@test.com");
        employee1.setStreet("123 fake st");
        employee1.setSuburb("Silent Hill");
        employee1.setState("NSW");
        employee1.setPostCode("2000");
        employee1.setEmployeeUser("chemas");
        employee1.setEmployeeEmail();
        employee1.setStartDate(date1);
        employee1.setFinishDate(date1);
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
        employee2.setBirthDate(date1);
        employee2.setGender("male");
        employee2.setMobile("0440404040");
        employee2.setEmail("test@test.com");
        employee2.setStreet("123 fake st");
        employee2.setSuburb("FakesVille");
        employee2.setState("NSW");
        employee2.setPostCode("2000");
        employee2.setEmployeeUser("squten");
        employee2.setEmployeeEmail();
        employee2.setStartDate(date1);
        employee2.setFinishDate(date1);
        employee2.setIsFullTime(false);
        employee2.setIsPermanent(false);
        employee2.setWeeklyHours(36);
        employee2.setIsArchived(false);
        employeeRepository.save(employee2);
    }

    @Test
    public void getAllEmployees() {
        given().when().get("/employees").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2))
                .body("firstName", hasItems("Cheryl", "Squidward")).body("middleName", hasItems("Heather", null))
                .body("lastName", hasItems("Mason", "Tentacles")).body("employeeUser", hasItems("chemas", "squten"))
                .body("employeeEmail", hasItems("chemas@company.com", "squten@company.com"))
                .body("isFullTime", hasItems(false, false));
    }

    @Test
    public void getEmployeeById() {
        given().when().get("employees/{id}", employeeId).then().statusCode(HttpStatus.OK.value())
                .body("firstName", equalTo("Cheryl")).body("suburb", equalTo("Silent Hill"))
                .body("isArchived", equalTo(false));
    }

    @Test
    public void createEmployee_success() {
        CreateEmployeeDTO data = new CreateEmployeeDTO();
        data.setFirstName("Greg");
        data.setMiddleName("Greggor");
        data.setLastName("Gregson");
        data.setBirthDate(date1);
        data.setGender("nonbinary");
        data.setMobile("0440404040");
        data.setEmail("test@test.com");
        data.setStreet("57 Greg lane");
        data.setSuburb("Gregstown");
        data.setState("WA");
        data.setPostCode("3050");
        data.setStartDate(date1);
        data.setFinishDate(date1);
        data.setIsFullTime(true);
        data.setIsPermanent(false);
        data.setWeeklyHours(40);
        given().contentType(ContentType.JSON).body(data).when().post("/employees").then()
                .statusCode(HttpStatus.CREATED.value()).body("firstName", equalTo("Greg"))
                .body("gender", equalTo("nonbinary")).body("street", equalTo("57 Greg lane"))
                .body("id", notNullValue());

        given().when().get("/employees").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(3))
                .body("middleName", hasItems("Heather", null, "Greggor"))
                .body("isFullTime", hasItems(false, false, true))
                .body("employeeUser", hasItems("chemas", "squten", "gregre"));
    }

    @Test
    public void createEmployee_missingFirstName_failure() {
        CreateEmployeeDTO data = new CreateEmployeeDTO();
        data.setMiddleName("Greggor");
        data.setLastName("Gregson");
        data.setBirthDate(date1);
        data.setGender("nonbinary");
        data.setMobile("0440404040");
        data.setEmail("test@test.com");
        data.setStreet("57 Greg lane");
        data.setSuburb("Gregstown");
        data.setState("WA");
        data.setPostCode("3050");
        data.setStartDate(date1);
        data.setFinishDate(date1);
        data.setIsFullTime(false);
        data.setIsPermanent(false);
        data.setWeeklyHours(40);
        given().contentType(ContentType.JSON).body(data).when().post("/employees").then()
                .statusCode(HttpStatus.BAD_REQUEST.value());

        given().when().get("/employees").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2));
    }

    @Test
    public void archiveEmployee_success() {
        given().when().patch("employees/archive/{id}", employeeId).then().statusCode(HttpStatus.OK.value());

        given().when().get("employees/{id}", employeeId).then().statusCode(HttpStatus.OK.value())
                .body("firstName", equalTo("Cheryl")).body("suburb", equalTo("Silent Hill"))
                .body("isArchived", equalTo(true));
    }

    @Test
    public void archiveEmployee_wrongId_failure() {
        given().when().patch("employees/archive/{id}", 100L).then().statusCode(HttpStatus.NOT_FOUND.value());

        given().when().get("employees/{id}", employeeId).then().statusCode(HttpStatus.OK.value())
                .body("firstName", equalTo("Cheryl")).body("suburb", equalTo("Silent Hill"))
                .body("isArchived", equalTo(false));
    }

    @Test
    public void deleteEmployeeById_success() {
        given().when().delete("employees/{id}", employeeId).then().statusCode(HttpStatus.NO_CONTENT.value());

        given().when().get("/employees").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(1))
                .body("firstName", hasItems("Squidward"))
                .body("lastName", hasItems("Tentacles")).body("employeeUser", hasItems("squten"))
                .body("employeeEmail", hasItems( "squten@company.com"))
                .body("isFullTime", hasItems( false));
    }

    @Test
    public void deleteEmployeeById_noSuchId_failure(){
        given().when().delete("employees/{id}", 100L).then().statusCode(HttpStatus.NOT_FOUND.value());

        given().when().get("/employees").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2))
                .body("firstName", hasItems("Cheryl", "Squidward")).body("middleName", hasItems("Heather", null))
                .body("lastName", hasItems("Mason", "Tentacles")).body("employeeUser", hasItems("chemas", "squten"))
                .body("employeeEmail", hasItems("chemas@company.com", "squten@company.com"))
                .body("isFullTime", hasItems(false, false));
    }

    @Test
    public void getPagedEmployees_success(){
        given().when().get("/employees/page={page}", 0).then().statusCode(HttpStatus.OK.value()).body("first", equalTo(true)).body("last", equalTo(true)).body("totalPages", equalTo(1)).body("totalElements", equalTo(2)).body("content", hasSize(2));
    }

    @Test
    public void getPagedEmployeesByTerm_success(){
        given().when().get("/employees/page={page}/term={term}", 0, "Che").then().statusCode(HttpStatus.OK.value()).body("first", equalTo(true)).body("last", equalTo(true)).body("totalPages", equalTo(1)).body("totalElements", equalTo(1)).body("content", hasSize(1));
    }

    @Test
    public void getPagedEmployeesByTermAndArchivedStatus_success(){
        given().when().get("employees/page={page}/term={term}/archived={archived}", 0, "", false).then().statusCode(HttpStatus.OK.value()).body("first", equalTo(true)).body("last", equalTo(true)).body("totalPages", equalTo(1)).body("totalElements", equalTo(2)).body("content", hasSize(2));
    }

}
