package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

	private TeacherRepository teacherRepository;
	private StudentRepository studentRepository;
	
	public TeacherController (
			StudentRepository studentRepository,
			TeacherRepository teacherRepository) {
		super();
		this.studentRepository = studentRepository;
		this.teacherRepository = teacherRepository;
	}
	
	@GetMapping("/")
	Collection<Teacher> getTeacher(){
		return teacherRepository.findAll();
	}
	
	@GetMapping("/{teacherid}")
	ResponseEntity<?> getClassRoster(@PathVariable Long teacherid) {
		Optional<Teacher> teacher = teacherRepository.findById(teacherid);
		
		return teacher.map(response -> 
			ResponseEntity.ok().body(studentRepository.findByTeacher(response)))
		.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
}
