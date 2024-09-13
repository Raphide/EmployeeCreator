package io.nology.employee.common.exceptions;

import io.nology.employee.common.ValidationErrors;

public class ServiceValidationException extends Exception{

    private ValidationErrors errors;

    public ServiceValidationException(ValidationErrors errors){
        this.errors = errors;
    }

    public ValidationErrors getErrors(){
        return errors;
    }

}
