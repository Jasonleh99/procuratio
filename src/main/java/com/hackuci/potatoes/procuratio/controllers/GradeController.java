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
import com.hackuci.potatoes.procuratio.models.Grade;
import com.hackuci.potatoes.procuratio.repositories.GradeRepository;

@RestController
@RequestMapping("/api/")
public class GradeController {

	private GradeRepository gradeRepository;
	
	public GradeController (GradeRepository gradeRepository) {
		super();
		this.gradeRepository = gradeRepository;
	}
	
	@GetMapping("/")
	Collection<Grade> getGrades(){
		return gradeRepository.findAll();
	}
	
	@GetMapping("/{studentId}")
	ResponseEntity<?> getGrade(@PathVariable Long studentId){
		Optional<Grade> assignment= gradeRepository.findById(studentId);
		return assignment.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
}
//TODO average of grades for each subject - jason 	
}
