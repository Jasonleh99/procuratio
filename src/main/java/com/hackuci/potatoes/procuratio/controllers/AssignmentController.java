package com.hackuci.potatoes.procuratio.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("/student/{studentId}")
	ResponseEntity<?> getAssignment(@PathVariable Long studentId){
		Optional<Student> student = studentRepository.findById(studentId);
		return student.map(response -> ResponseEntity.ok().body(asRepository.findByStudent(response)))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/{assignmentId}")
	ResponseEntity<?> getStudentAssignment(@PathVariable Long assignmentId) {
		Optional<Assignment> assignment= assignmentRepository.findById(assignmentId);
		return assignment.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_assignment_submission")
	ResponseEntity<Assignment> createAssignment(@Valid @RequestBody Assignment assignment) throws URISyntaxException{
		Assignment result = assignmentRepository.save(assignment);
		return ResponseEntity.created(new URI("/api/assignment" + result.getId())).body(result);
	}
	
	@PutMapping("/update_assignment")
	ResponseEntity<Assignment> updateAssignment(@Valid @RequestBody Assignment assignment){
		Assignment result = assignmentRepository.save(assignment);
		return ResponseEntity.ok().body(result);
	}
	
	@PutMapping("/update_submission")
	ResponseEntity<AssignmentStudent> updateAssignmentStudent(@Valid @RequestBody AssignmentStudent assignmentStudent){
		AssignmentStudent result = asRepository.save(assignmentStudent);
		return ResponseEntity.ok().body(result);
	}

	
}
