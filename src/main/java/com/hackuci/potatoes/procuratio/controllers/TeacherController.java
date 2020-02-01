package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

	private TeacherRepository teacherRepository;
	
	//TODO: add method from student repository 
	private StudentRepository studentRepository;
	
	public TeacherController (TeacherRepository teacherRepository) {
		super();
		this.teacherRepository = teacherRepository;
	}
	
	@GetMapping("/")
	Collection<Teacher> getTeacher(){
		return teacherRepository.findAll();
	}
	
	//TODO get class roster
	
}
