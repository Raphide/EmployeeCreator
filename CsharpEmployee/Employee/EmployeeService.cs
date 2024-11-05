using System.Text.RegularExpressions;
using CsharpEmployee.Employee.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using EmployeeEntity = CsharpEmployee.Employee.Entities.Employee;

namespace CsharpEmployee.Employee
{
    public partial class EmployeeService
    {
        private readonly IEmployeeRepository _repo;
        public EmployeeService(IEmployeeRepository repository)
        {
            _repo = repository;
        }

        [GeneratedRegex("[^a-zA-Z]")]
        private static partial Regex MyRegex();
        [GeneratedRegex("(?<=\\D)(?=\\d)")]
        private static partial Regex MyRegex1();

        public string UserCreator(string firstName, string lastName)
        {
            int fnLength = firstName.Length >= 3 ? 3 : 2;
            int lnLength = lastName.Length >= 3 ? 3 : 2;

            string newUser = MyRegex().Replace(firstName, "").Substring(0, fnLength).ToLower()
                            + MyRegex().Replace(lastName, "").Substring(0, lnLength).ToLower();

            if (_repo.ExistsByEmployeeUser(newUser))
            {
                int number = 1;
                newUser = $"{newUser}{number}";

                while (_repo.ExistsByEmployeeUser(newUser))
                {
                    string[] userArray = MyRegex1().Split(newUser);
                    int idInt = int.Parse(userArray[1]);
                    idInt++;
                    userArray[1] = idInt.ToString();

                    newUser = string.Join("", userArray);
                }
            }

            return newUser;
        }
        public async Task<EmployeeEntity> CreateEmployeeAsync(CreateEmployeeDto data)
        {
            string User = UserCreator(data.FirstName, data.LastName);
            var employee = new EmployeeEntity
            {
                FirstName = data.FirstName,
                MiddleName = data.MiddleName,
                LastName = data.LastName,
                Gender = data.Gender,
                BirthDate = data.BirthDate,
                Email = data.Email,
                Mobile = data.Mobile,
                Street = data.Street,
                Suburb = data.Suburb,
                State = data.State,
                Postcode = data.Postcode,
                IsPermanent = data.IsPermanent,
                IsFullTime = data.IsFullTime,
                StartDate = data.StartDate,
                FinishDate = data.FinishDate,
                WeeklyHours = data.WeeklyHours,
                EmployeeUser = User,
                EmployeeEmail = User + "@company.com",
                IsArchived = false
            };
            try
            {
                return await _repo.AddEmployeeAsync(employee);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating employee: {ex.Message}");
                throw;
            }
        }

        // public async Task<EmployeeEntity> FindEmployeeById(int id)
        // {
        //     return await _repo.GetByIdAsync(id);
        // }

        // public async Task<IEnumerable<EmployeeEntity>> GetEmployees()
        // {
        //     return await _repo.GetEmployeesAsync();
        // }

        public async Task<IEnumerable<EmployeeEntity>> FindAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<PagedResult<EmployeeEntity>> FindByPageAsync(int page, int pageSize)
        {
            return await _repo.GetPageAsync(page, pageSize);
        }

        public async Task<IEnumerable<EmployeeEntity>> FindByTermAsync(string term)
        {
            return await _repo.SearchByTermAsync(term);
        }

        public async Task<IEnumerable<EmployeeEntity>> FindByPageAndTermAsync(int page, string term, int pageSize)
        {
            return await _repo.GetPageByTermAsync(page, term, pageSize);
        }

public async Task<PagedResult<EmployeeEntity>> FindByPageAndTermAndArchivedAsync(
    int pageNumber, int pageSize, string term, bool archived)
{
    return await _repo.GetEmployeesPagedFilteredAsync(pageNumber, pageSize, term, archived);
}

        public async Task<EmployeeEntity> FindByIdAsync(long id)
        {
            return await _repo.GetByIdAsync(id);
        }


        public async Task<EmployeeEntity> UpdateEmployee(long id, UpdateEmployeeDto data)
        {
            var existingEmployee = await _repo.GetByIdAsync(id);
            if (existingEmployee == null)
            {
                return null;
            }

            existingEmployee.FirstName = data.FirstName;
            existingEmployee.MiddleName = data.MiddleName;
            existingEmployee.LastName = data.LastName;
            existingEmployee.Gender = data.Gender;
            existingEmployee.BirthDate = data.BirthDate;
            existingEmployee.Email = data.Email;
            existingEmployee.Mobile = data.Mobile;
            existingEmployee.Street = data.Street;
            existingEmployee.Suburb = data.Suburb;
            existingEmployee.State = data.State;
            existingEmployee.Postcode = data.Postcode;
            existingEmployee.IsPermanent = data.IsPermanent;
            existingEmployee.IsFullTime = data.IsFullTime;
            existingEmployee.StartDate = data.StartDate;
            existingEmployee.FinishDate = data.FinishDate;
            existingEmployee.WeeklyHours = data.WeeklyHours;
            existingEmployee.IsArchived = data.IsArchived;

            return await _repo.UpdateEmployee(existingEmployee);
        }

        public async Task<bool> DeleteEmployeeAsync(long id)
        {
            var existingEmployee = await _repo.GetByIdAsync(id);
            if (existingEmployee == null)
            {
                return false;
            }

            await _repo.DeleteEmployee(id);
            return true;
        }


    }
}