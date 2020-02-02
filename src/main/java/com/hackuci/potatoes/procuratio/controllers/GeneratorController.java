package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.UserType;
import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.User;
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
			User user = new User();
			user.setUserType(UserType.PARENT);
			Parent parent = new Parent();
			parent.setUser(user);
			parent.getUser().setName(name);
			parent.getUser().setLogin(name + "@gmail.com");
			parent.getUser().setPassword("qwerty");
			pRepo.save(parent);
		}
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/students")
	ResponseEntity<?> generateStudents(@Valid @RequestBody Collection<String> names) {
		for (String name: names) {
			User user = new User();
			user.setUserType(UserType.STUDENT);
			Student student = new Student();
			student.setUser(user);
			student.getUser().setName(name);
			student.getUser().setLogin(name + "123");
			student.setPairid(student.getUser().getLogin().hashCode() + "");
			student.getUser().setPassword("qwerty");
		}
		
		return ResponseEntity.ok().build();
	}
}
