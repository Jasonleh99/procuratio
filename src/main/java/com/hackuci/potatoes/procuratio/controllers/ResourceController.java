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

import com.hackuci.potatoes.procuratio.models.Resource;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.ResourceRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {
	private ResourceRepository resourceRepository;
	private TeacherRepository teacherRepository;
	
	public ResourceController (ResourceRepository resourceRepository,
			TeacherRepository teacherRepository) {
		super();
		this.resourceRepository = resourceRepository;
		this.teacherRepository = teacherRepository;
	}
	
	@GetMapping("/")
	Collection<Resource> getResources(){
		return resourceRepository.findAll();
	}
	
	@GetMapping("/{teacherId}")
	ResponseEntity<?> getDocument(@PathVariable Long teacherId){
		Optional<Teacher> teacher = teacherRepository.findById(teacherId);
		return teacher.map(response -> ResponseEntity.ok().body(resourceRepository.findByTeacher(response)))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_resource")
	ResponseEntity<Resource> createResource(@Valid @RequestBody Resource resource) throws URISyntaxException{
		Resource result = resourceRepository.save(resource);
		return ResponseEntity.created(new URI("/api/resource/" + result.getId())).body(result);
	}
	
	@PutMapping("/update_resource")
	ResponseEntity<Resource> updateResource(@Valid @RequestBody Resource resource){
		Resource result = resourceRepository.save(resource);
		return ResponseEntity.ok().body(result);
	}
}
