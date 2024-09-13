package io.nology.employee.Employee;

import java.util.Date;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class UpdateEmployeeDTO {

    @Pattern(regexp = ".*\\S.*", message = "First Name cannot be empty")
    @Length(min = 2)
    private String firstName;
    @Nullable
    private String middleName;
    @Pattern(regexp = ".*\\S.*", message = "Last Name cannot be empty")
    @Length(min = 2)
    private String lastName;

    @Pattern(regexp = "male\\b|female\\b|nonbinary\\b", message = "input must be male, female or nonbinary")
    private String gender;
    @DateTimeFormat(iso = ISO.DATE, fallbackPatterns = { "M/d/yy", "dd.MM.yyyy" })
    private Date birthDate;
  
    @Email
    @Pattern(regexp = ".*\\S.*", message = "Email cannot be empty")
    private String email;
    // @NotBlank
    @Pattern(regexp = "\\d+", message = "only use numbers")
    @Pattern(regexp = ".*\\S.*", message = "Mobile cannot be empty")
    private String mobile;

    @Pattern(regexp = ".*\\S.*", message = "Street cannot be empty")
    private String street;

    @Pattern(regexp = ".*\\S.*", message = "Suburb cannot be empty")
    private String suburb;

    @Pattern(regexp = ".*\\S.*", message = "State cannot be empty")
    private String state;

    @Pattern(regexp = "\\d+", message = "only use numbers")
    @Pattern(regexp = ".*\\S.*", message = "Postcode cannot be empty")
    private String postCode;
 
    private Boolean isPermanent;

    private Boolean isFullTime;
    @DateTimeFormat(iso = ISO.DATE, fallbackPatterns = { "M/d/yy", "dd.MM.yyyy" })
    private Date startDate;
    @DateTimeFormat(iso = ISO.DATE, fallbackPatterns = { "M/d/yy", "dd.MM.yyyy" })
    private Date finishDate;
    @NotNull
    private double weeklyHours;
    public String getFirstName() {
        return firstName;
    }
    public String getMiddleName() {
        return middleName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getGender() {
        return gender;
    }
    public Date getBirthDate() {
        return birthDate;
    }
    public String getEmail() {
        return email;
    }
    public String getMobile() {
        return mobile;
    }
    public String getStreet() {
        return street;
    }
    public String getSuburb() {
        return suburb;
    }
    public String getState() {
        return state;
    }
    public String getPostCode() {
        return postCode;
    }
    public Boolean getIsPermanent() {
        return isPermanent;
    }
    public Boolean getIsFullTime() {
        return isFullTime;
    }
    public Date getStartDate() {
        return startDate;
    }
    public Date getFinishDate() {
        return finishDate;
    }
    public double getWeeklyHours() {
        return weeklyHours;
    }

    

}
