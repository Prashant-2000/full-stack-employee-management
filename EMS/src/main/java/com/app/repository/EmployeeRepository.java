package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Employee;

//Once our EmployeeRepository extends JpaRepository interface then EmployeeRepository can perform CRUD operations on Employee JPA Entity
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
