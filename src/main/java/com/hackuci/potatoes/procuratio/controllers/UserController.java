package com.hackuci.potatoes.procuratio.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.repositories.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {
	private UserRepository useRepo;
	
	public UserController(UserRepository useRepo) {
		this.useRepo = useRepo;
	}
	
	@GetMapping("/")
	ResponseEntity<?> getAllUsers() {
		return ResponseEntity.ok().body(useRepo.findAll());
	}
}
