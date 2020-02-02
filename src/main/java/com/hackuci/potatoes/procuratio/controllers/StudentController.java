package com.hackuci.potatoes.procuratio.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.repositories.StudentRepository;

@RestController
@RequestMapping("/api/students")
public class StudentController {
	private StudentRepository stuRepo;
	
	public StudentController(StudentRepository stuRepo) {
		this.stuRepo = stuRepo;
	}
	
	@GetMapping("/")
	ResponseEntity<?> getAllStudents() {
		return ResponseEntity.ok().body(stuRepo.findAll());
	}
}
