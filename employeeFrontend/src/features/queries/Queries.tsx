import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllEmployees } from '../../services/EmployeeServices'
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard'

const Queries = () => {
    const {isPending, isError, data, error} = useQuery({queryKey: ['employees'], queryFn: getAllEmployees})

    if(isPending){
        return <span>Loading...</span>
    }

    if(isError){
        return <span>Error: {error.message}</span>
    }
    
  return (
    <div>
        <ul>
            {data.map((employee)=>(
            <EmployeeCard key={employee.id} employee={employee} />
            ))}
        </ul>
    </div>
  )
}

export default Queries