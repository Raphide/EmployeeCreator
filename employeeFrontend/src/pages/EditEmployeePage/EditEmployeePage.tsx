import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editEmployeeById, getEmployeeById } from '../../services/EmployeeServices';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import { EmployeeFormData } from '../../components/EmployeeForm/schema';

const EditEmployeePage = () => {
    const navigate = useNavigate();
    const {id} = useParams() as unknown as { id: number };
    const formSubmit = (empData: EmployeeFormData) => {
       editEmployeeById(id, empData).then(() => navigate('/employees')).catch((e) => console.log(e));
    }
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["employees"],
        queryFn: () => getEmployeeById(id),
      });

      if (isPending) {
        return <span>Loading...</span>;
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
  return (
    <div>
        <EmployeeForm onSubmit={formSubmit} formType='EDIT' defaultValues={data} />
    </div>
  )
}

export default EditEmployeePage