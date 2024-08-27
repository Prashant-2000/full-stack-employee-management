package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
	
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
}

//We'll use EmployeeDTO class to transfer the data between client and server so that when we build responses then we'll use this EmployeeDto response for REST API