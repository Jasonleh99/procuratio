package com.hackuci.potatoes.procuratio.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.models.User;
import com.hackuci.potatoes.procuratio.repositories.ParentRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;
import com.hackuci.potatoes.procuratio.repositories.UserRepository;

@RestController
@RequestMapping("/api")
public class BaseController {
	private StudentRepository stuRepo;
	private TeacherRepository teaRepo;
	private ParentRepository parRepo;
	private UserRepository useRepo;
	
	public BaseController(StudentRepository stuRepo,
			TeacherRepository teaRepo,
			ParentRepository parRepo,
			UserRepository useRepo) {
		this.stuRepo = stuRepo;
		this.teaRepo = teaRepo;
		this.parRepo = parRepo;
		this.useRepo = useRepo;
	}
	
	@PostMapping("/new_student")
	ResponseEntity<?> addNewStudent(@Valid @RequestBody Student student) {
		stuRepo.save(student);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/new_parent")
	ResponseEntity<?> addNewParent(@Valid @RequestBody Parent parent) {
		parRepo.save(parent);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/new_user")
	ResponseEntity<?> addNewUser(@Valid @RequestBody User user) {
		useRepo.save(user);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/new_teacher")
	ResponseEntity<?> addNewTeacher(@Valid @RequestBody Teacher teacher) {
		teaRepo.save(teacher);
		return ResponseEntity.ok().build();
	}
}
