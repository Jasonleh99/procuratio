package com.hackuci.potatoes.procuratio.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.repositories.ParentRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;

@RestController
@RequestMapping("/api/parents")
public class ParentController {
	private ParentRepository pRepo;
	private StudentRepository sRepo;
	
	public ParentController(ParentRepository pRepo,
			StudentRepository sRepo) {
		super();
		this.pRepo = pRepo;
		this.sRepo = sRepo;
	}
	
	@GetMapping("/")
	ResponseEntity<?> getAllParents() {
		return ResponseEntity.ok().body(pRepo.findAll());
	}

	@PutMapping("/{parentid}/{pairid}")
	ResponseEntity<?> pairParent(@PathVariable Long parentid, @PathVariable String pairid) {
		Optional<Student> student = sRepo.findByPairid(pairid);
		Optional<Parent> parent = pRepo.findById(parentid);
		if (parent.isPresent() && student.isPresent()) {
			Student tempStudent = new Student();
			tempStudent.setId(student.get().getId());
			tempStudent.setPairid(student.get().getPairid());
			tempStudent.setUser(student.get().getUser());
			tempStudent.setTeacher(student.get().getTeacher());
			Parent tempParent = new Parent();
			tempParent.setId(parent.get().getId());
			tempParent.setMessages(parent.get().getMessages());
			parent.get().setStudent(tempStudent);
			student.get().setParent(tempParent);
			
			sRepo.save(student.get());
			Parent result = pRepo.save(parent.get());
			return ResponseEntity.ok().body(result);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
