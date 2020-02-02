package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;
import java.util.Optional;

import javax.xml.ws.Response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.GradeRepository;
import com.hackuci.potatoes.procuratio.repositories.ParentRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

	private TeacherRepository teacherRepository;
	private StudentRepository studentRepository;
	private GradeRepository gradeRepository;
	private ParentRepository parentRepository;
	
	public TeacherController (
			StudentRepository studentRepository,
			TeacherRepository teacherRepository,
			GradeRepository gradeRepository,
			ParentRepository parentRepository) {
		super();
		this.studentRepository = studentRepository;
		this.teacherRepository = teacherRepository;
		this.gradeRepository = gradeRepository;
		this.parentRepository = parentRepository;
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
	
	@GetMapping("/grades/{teacherid}")
	ResponseEntity<?> getAverageSubjectGrades(@PathVariable Long teacherid) {
		Optional<Teacher> teacher = teacherRepository.findById(teacherid);
		return teacher.map(response -> 
			ResponseEntity.ok().body(gradeRepository.findByTeacher(response)))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/student/{studentid}")
	ResponseEntity<?> getTeacherByStudent(@PathVariable Long studentid) {
		Optional<Student> student = studentRepository.findById(studentid);
		return student.map(response -> ResponseEntity.ok().body(response.getTeacher()))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/parent/{parentid}")
	ResponseEntity<?> getTeacherByParent(@PathVariable Long parentid) {
		Optional<Parent> parent = parentRepository.findById(parentid);
		return parent.map(response -> ResponseEntity.ok().body(response.getStudent().getTeacher()))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
