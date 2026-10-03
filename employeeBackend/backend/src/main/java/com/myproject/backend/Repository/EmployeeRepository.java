package com.myproject.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myproject.backend.Model.Employees;


public interface EmployeeRepository extends JpaRepository<Employees, Integer> {
    
}
