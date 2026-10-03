package com.myproject.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Testcontroller {
    @GetMapping("/welcome")
    public String getwelcomepage(){
        return "Welcome";
    }
}

