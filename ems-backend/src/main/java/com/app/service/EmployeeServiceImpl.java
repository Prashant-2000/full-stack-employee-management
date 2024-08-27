package com.app.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.app.dto.EmployeeDto;
import com.app.entity.Employee;
import com.app.exception.ResourceNotFoundException;
import com.app.mapper.EmployeeMapper;
import com.app.repository.EmployeeRepository;

import lombok.AllArgsConstructor;

@Service                          //This annotation tells spring container to create bean for this(EmployeeServiceImpl) class
@AllArgsConstructor               //used to inject dependency
public class EmployeeServiceImpl implements EmployeeService{
	
	private EmployeeRepository employeeRepo;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepo.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		
		Employee employee = employeeRepo.findById(employeeId)
							.orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given id : " + employeeId));
		
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		
		List<Employee> employees = employeeRepo.findAll();
		
		return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
		
		//Checking whether the id is present or not?
		Employee employee = employeeRepo.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given id : " + employeeId));
		
		//Setting values 
		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setEmail(updatedEmployee.getEmail());
		
		//It is performing both update and delete operations
		Employee updatedEmployeeObj = employeeRepo.save(employee);
		
		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		
		//Checking whether the id is present or not?
		Employee employee = employeeRepo.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given id : " + employeeId));
		
		employeeRepo.deleteById(employeeId);
	}

}
