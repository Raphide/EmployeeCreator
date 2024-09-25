import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getAllEmployees, getPagedEmployees } from '../../services/EmployeeServices';
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';

const TestPage = () => {
    const [page, setPage] = useState<number>(0);

    const {isFetching, isPending, isError, data, error, isPlaceholderData}=useQuery({
        queryKey: ["employees", page],
        queryFn: () => getPagedEmployees(page),
        placeholderData: keepPreviousData,
    });

    
  if (isFetching) {
    return <span>Loading...</span>;
  }
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
<><div>
    {data.content.map((employee)=> 
    <EmployeeCard key={employee.id} employee={employee}/>)}</div></>
  )
}

export default TestPage