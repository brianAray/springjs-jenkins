package com.revature.service;

import com.revature.exception.UserNotFoundException;
import com.revature.model.Customer;
import com.revature.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private CustomerRepository customerRepository;

    public UserService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    public Customer getUser(String name) throws UserNotFoundException {
        Optional<Customer> customerOptional = customerRepository.findByUsername(name);
        if(customerOptional.isPresent()){
            return customerOptional.get();
        }else{
            throw new UserNotFoundException();
        }
    }

    public Customer saveUser(Customer customer) {
        return customerRepository.save(customer);
    }
}
