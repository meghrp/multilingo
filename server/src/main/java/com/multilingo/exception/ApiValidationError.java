package com.multilingo.exception;

/**
 * Validation error for a specific field
 */
public class ApiValidationError extends ApiSubError {
    
    private String field;
    private String message;
    
    public ApiValidationError() {
    }
    
    public ApiValidationError(String field, String message) {
        this.field = field;
        this.message = message;
    }
    
    public String getField() {
        return field;
    }
    
    public void setField(String field) {
        this.field = field;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
} 