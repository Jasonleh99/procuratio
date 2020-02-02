package com.hackuci.potatoes.procuratio.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.repositories.ParentRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;

@RestController
@RequestMapping("/api/parent")
public class ParentController {
	private ParentRepository pRepo;
	private StudentRepository sRepo;
	
	public ParentController(ParentRepository pRepo,
			StudentRepository sRepo) {
		super();
		this.pRepo = pRepo;
		this.sRepo = sRepo;
	}

	@PutMapping("/{parentid}/{pairid}")
	ResponseEntity<?> pairParent(@PathVariable Long parentid, @PathVariable String pairid) {
		Optional<Student> student = sRepo.findByPairId(pairid);
		Optional<Parent> parent = pRepo.findById(parentid);
		if (parent.isPresent() && student.isPresent()) {
			parent.get().setStudent(student.get());
			student.get().setAssociated_parent(parent.get());
			
			sRepo.save(student.get());
			Parent result = pRepo.save(parent.get());
			return ResponseEntity.ok().body(result);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
