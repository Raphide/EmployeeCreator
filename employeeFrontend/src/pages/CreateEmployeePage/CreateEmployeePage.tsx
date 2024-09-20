import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { EmployeeFormData } from "../../components/EmployeeForm/schema";
import { createEmployee } from "../../services/EmployeeServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CreateEmployeePage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: async () => {
      console.log("this has worked");
      navigate("/employees");
    },
    onError: async () => {
      console.log("[EXTREMELY LOUD INCORRECT BUZZER SOUND]");
    },
  });

  return (
    <div>
      <EmployeeForm onSubmit={mutation.mutate} />
    </div>
  );
};

export default CreateEmployeePage;
