package com.myproject.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.myproject.backend.Model.Employees;
import com.myproject.backend.Repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // public Employees addemployeedata(Employees newEmployee){
    //     return employeeRepository.save(newEmployee);
    // }

    public Employees save(Employees newEmployee){
        Employees addemployeedata = employeeRepository.save(newEmployee);
        return addemployeedata;
    }

    public List<Employees> getemployeedata() {
        return employeeRepository.findAll();
    }
    
    public boolean deleteRow(@PathVariable("id") Integer id) {
    	if(!employeeRepository.findById(id).equals(Optional.empty())) {
    		employeeRepository.deleteById(id);
    		return true;
    	}
    	return false;
    }
    
}
