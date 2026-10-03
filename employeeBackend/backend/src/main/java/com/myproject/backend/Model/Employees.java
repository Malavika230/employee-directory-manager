package com.myproject.backend.Model;


import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Employees")
public class Employees {
    
    @Id
    private int emp_id;
    
    private String name;
    private String role;
    private String location;

    public Employees(){
        super();
    }
    public Employees(int emp_id, String name, String role, String location){
        super();
        this.emp_id = emp_id;
        this.name = name;
        this.role = role;
        this.location = location;
    }

    public int getempid() {
        return emp_id;
    }

    public void setempid(int emp_id) {
        this.emp_id = emp_id;
    }

    public String getname() {
        return name;
    }

    public void setname(String name){
        this.name = name;
    }

    public String getrole(){
        return role;
    }

    public void setrole(String role){
        this.role = role;
    }

    public String getlocation(){
        return location;
    }

    public void setlocation(String location){
        this.location = location;
    }

}
