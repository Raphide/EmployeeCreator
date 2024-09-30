import axios, { AxiosResponse } from "axios";
import { PagedResponse } from "../../services/EmployeeServices";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeePage from "./EmployeePage";

describe("EmployeePage", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Should render a table based on get request", async () => {
        const mockPagedResponse = {
            data: {
                "content": [
                    {
                        "id": 2,
                        "firstName": "Mario",
                        "middleName": "",
                        "lastName": "Mario",
                        "gender": "male",
                        "birthDate": "1955-10-11T00:00:00.000+00:00",
                        "email": "itsame@mario.com",
                        "mobile": "0404333333",
                        "street": "33 Rainbow Road",
                        "suburb": "Mushroom Kingdom",
                        "state": "SA",
                        "postCode": "5356",
                        "isPermanent": true,
                        "isFullTime": true,
                        "startDate": "1985-09-13T00:00:00.000+00:00",
                        "finishDate": "2028-12-31T00:00:00.000+00:00",
                        "weeklyHours": 40.0,
                        "employeeUser": "marmar",
                        "employeeEmail": "marmar@company.com",
                        "isArchived": false
                    },
                    {
                        "id": 3,
                        "firstName": "Luigi",
                        "middleName": "",
                        "lastName": "Mario",
                        "gender": "male",
                        "birthDate": "1980-10-11T00:00:00.000+00:00",
                        "email": "OkieDokie@mario.com",
                        "mobile": "0404333333",
                        "street": "73 Maple Treeway",
                        "suburb": "Mushroom Kingdom",
                        "state": "SA",
                        "postCode": "5004",
                        "isPermanent": true,
                        "isFullTime": false,
                        "startDate": "1990-06-13T00:00:00.000+00:00",
                        "finishDate": "2029-11-25T00:00:00.000+00:00",
                        "weeklyHours": 24.0,
                        "employeeUser": "luimar",
                        "employeeEmail": "luimar@company.com",
                        "isArchived": false
                    },
                    {
                        "id": 4,
                        "firstName": "Cheryl",
                        "middleName": "Heather",
                        "lastName": "Mason",
                        "gender": "female",
                        "birthDate": "1983-07-17T00:00:00.000+00:00",
                        "email": "Valtiel@ph.com",
                        "mobile": "0404333333",
                        "street": "6 Matheson street",
                        "suburb": "Silent Hill",
                        "state": "TAS",
                        "postCode": "7466",
                        "isPermanent": false,
                        "isFullTime": true,
                        "startDate": "2003-05-23T00:00:00.000+00:00",
                        "finishDate": "2025-05-23T00:00:00.000+00:00",
                        "weeklyHours": 40.0,
                        "employeeUser": "chemas",
                        "employeeEmail": "chemas@company.com",
                        "isArchived": false
                    }
                ],
                "pageable": {
                    "pageNumber": 0,
                    "pageSize": 10,
                    "sort": {
                        "empty": true,
                        "sorted": false,
                        "unsorted": true
                    },
                    "offset": 0,
                    "paged": true,
                    "unpaged": false
                },
                "last": true,
                "totalPages": 1,
                "totalElements": 3,
                "size": 10,
                "number": 0,
                "sort": {
                    "empty": true,
                    "sorted": false,
                    "unsorted": true
                },
                "first": true,
                "numberOfElements": 3,
                "empty": false
            }
        } as AxiosResponse;
        jest.spyOn(axios, 'get').mockResolvedValueOnce(mockPagedResponse);
        render(
            <MemoryRouter>
                <EmployeePage />
            </MemoryRouter>
        );
        expect(screen.getByText("loading...")).toBeInTheDocument();
    })
})