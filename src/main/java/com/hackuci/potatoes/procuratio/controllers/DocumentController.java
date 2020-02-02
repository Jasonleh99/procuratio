package com.hackuci.potatoes.procuratio.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
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

import com.hackuci.potatoes.procuratio.models.Document;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.DocumentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
	private DocumentRepository documentRepository;
	
	private TeacherRepository teacherRepository;
	
	public DocumentController (DocumentRepository documentRepository,
			TeacherRepository teacherRepository) {
		super();
		this.documentRepository = documentRepository;
		this.teacherRepository = teacherRepository;
	
	}
	
	@GetMapping("/")
	Collection<Document> getDocuments(){
		return documentRepository.findAll();
	}
	
	@GetMapping("/{teacherId}")
	ResponseEntity<?> getDocument(@PathVariable Long teacherId){
		Optional<Teacher> teacher = teacherRepository.findById(teacherId);
		return teacher.map(response -> ResponseEntity.ok().body(documentRepository.findByTeacher(response)))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_document")
	ResponseEntity<Document> createDocument(@Valid @RequestBody Document document) throws URISyntaxException{
		Document result = documentRepository.save(document);
		return ResponseEntity.created(new URI("/api/message/" + result.getId())).body(result);
	}
	
	@PutMapping("/update_document")
	ResponseEntity<Document> updateDocument(@Valid @RequestBody Document document){
		Document result = documentRepository.save(document);
		return ResponseEntity.ok().body(result);
	}

}
