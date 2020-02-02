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
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.GradeRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/grades")
public class GradeController {

	private TeacherRepository teacherRepository;
	private GradeRepository gradeRepository;
	
	public GradeController (TeacherRepository teacherRepository,
			GradeRepository gradeRepository) {
		super();
		this.teacherRepository = teacherRepository;
		this.gradeRepository = gradeRepository;
	}
	
	@GetMapping("/")
	Collection<Grade> getGrades(){
		return gradeRepository.findAll();
	}
	
	@GetMapping("/{teacherid}")
	ResponseEntity<?> getGrade(@PathVariable Long teacherid){
		Optional<Teacher> teacher = teacherRepository.findById(teacherid);
		return teacher.map(response -> ResponseEntity.ok().body(gradeRepository.findByTeacher(response)))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
}
//TODO average of grades for each subject - jason 	
}
