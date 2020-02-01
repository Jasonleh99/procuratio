package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.models.AssignmentStudent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.repositories.AssignmentRepository;
import com.hackuci.potatoes.procuratio.repositories.AssignmentStudentRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
	private AssignmentRepository assignmentRepository;
	private AssignmentStudentRepository asRepository;
	private StudentRepository studentRepository;
	
	public AssignmentController (AssignmentRepository assignmentRepository,
			AssignmentStudentRepository asRepository,
			StudentRepository studentRepository) {
		super();
		this.assignmentRepository = assignmentRepository;
		this.asRepository = asRepository;
		this.studentRepository = studentRepository;
	}
	
	@GetMapping("/{studentId}")
	ResponseEntity<?> getAssignment(@PathVariable Long studentId){
		Optional<Student> student = studentRepository.findById(studentId);
		return student.map(response -> ResponseEntity.ok().body(asRepository.findByStudent(response)))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/{studentId}/{assignmentId}")
	ResponseEntity<?> getStudentAssignment(@PathVariable Long assignmentId){
		//TODO: find by student id && assignment id
		Optional<Assignment> assignment= assignmentRepository.findById(assignmentId);
		return assignment.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
