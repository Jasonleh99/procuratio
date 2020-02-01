package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.repositories.AssignmentRepository;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
	private AssignmentRepository assignmentRepository;
	
	public AssignmentController (AssignmentRepository assignmentRepository) {
		super();
		this.assignmentRepository = assignmentRepository;
	}

	@GetMapping("/")
	Collection<Assignment> getAssignments(){
		return assignmentRepository.findAll();
	}
	
	@GetMapping("/{studentId}")
	ResponseEntity<?> getAssignment(@PathVariable Long studentId){
		Optional<Assignment> assignment= assignmentRepository.findById(studentId);
		return assignment.map(response -> ResponseEntity.ok().body(response))
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
