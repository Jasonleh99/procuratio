package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.repositories.ParentRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;

@RestController
@RequestMapping("/api/generate")
public class GeneratorController {
	private StudentRepository sRepo;
	private ParentRepository pRepo;
	
	public GeneratorController(StudentRepository sRepo,
			ParentRepository pRepo) {
		super();
		this.sRepo = sRepo;
		this.pRepo = pRepo;
	}
	
	@PostMapping("/parents")
	ResponseEntity<?> generateParents(@Valid @RequestBody Collection<String> names) {
		for (String name: names) {
			Parent parent = new Parent();
			parent.setName(name);
			parent.setLogin(name + "@gmail.com");
			parent.setPassword("qwerty");
		}
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/students")
	ResponseEntity<?> generateStudents(@Valid @RequestBody Collection<String> names) {
		for (String name: names) {
			Student student = new Student();
			student.setName(name);
			student.setLogin(name + "123");
			student.setPairingid(student.getLogin().hashCode() + "");
			student.setPassword("qwerty");
		}
		
		return ResponseEntity.ok().build();
	}
}
