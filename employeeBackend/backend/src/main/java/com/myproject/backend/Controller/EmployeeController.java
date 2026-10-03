package com.myproject.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.backend.Model.Employees;
import com.myproject.backend.Service.EmployeeService;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class EmployeeController {
    
   @Autowired
   private EmployeeService employeeService;


    @PostMapping("/postemployees")
    public Employees postEmployees(@RequestBody Employees newEmployee){
        Employees savedEmployee = employeeService.save(newEmployee);
        return savedEmployee ;
    }


    @GetMapping("/getemployees")
    public List<Employees> getEmployees(){
        return employeeService.getemployeedata();
    }
    
    @DeleteMapping("/deleteemployees/{id}")
    public boolean deleteemployee(@PathVariable("id") Integer id) {
    	return employeeService.deleteRow(id);
    }
    

}

// @PostMapping("/postemployees")
// public Employees postEmployees(@RequestBody Employees newEmployee){
//     return employeeService.addemployeedata(newEmployee);
// }