package com.app.mapper;

import com.app.dto.EmployeeDto;
import com.app.entity.Employee;

public class EmployeeMapper {
	
//	This method will convert Employee entity to EmployeeDto
	public static EmployeeDto mapToEmployeeDto(Employee employee) {
		return new EmployeeDto(
				employee.getId(),
				employee.getFirstName(),
				employee.getLastName(),
				employee.getEmail()
		);
	}
	
//	This method will convert EmployeeDto to Employee entity
	public static Employee mapToEmployee(EmployeeDto employeeDto) {
		return new Employee(
				employeeDto.getId(),
				employeeDto.getFirstName(),
				employeeDto.getLastName(),
				employeeDto.getEmail()
				);
	}
}
