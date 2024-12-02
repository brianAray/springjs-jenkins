package com.revature.controller;

import com.revature.exception.UserNotFoundException;
import com.revature.model.Customer;
import com.revature.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class CustomerController {

    @Autowired
    private UserService userService;

    public CustomerController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Customer> getUserById(@RequestParam("name") String name) throws UserNotFoundException {
        return new ResponseEntity<>(userService.getUser(name), HttpStatus.OK);
    }

    @CrossOrigin("http://localhost:8080")
    @PostMapping(
            value = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Customer> loginUser(@RequestBody Customer customer) throws UserNotFoundException {
        Customer actualCustomer = userService.getUser(customer.getUsername());
        if(actualCustomer.getPassword().equals(customer.getPassword())){
            return new ResponseEntity<>(actualCustomer, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin("http://localhost:8080")
    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Customer> postUser(@RequestBody Customer customer){
        return new ResponseEntity<>(userService.saveUser(customer), HttpStatus.OK);
    }


}
