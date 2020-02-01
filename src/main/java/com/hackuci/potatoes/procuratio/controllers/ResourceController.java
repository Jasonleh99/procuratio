package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Resource;
import com.hackuci.potatoes.procuratio.repositories.ResourceRepository;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {
	private ResourceRepository resourceRepository;
	
	public ResourceController (ResourceRepository resourceRepository) {
	super();
	this.resourceRepository = resourceRepository;
	}
	
	@GetMapping("/")
	Collection<Resource> getResources(){
		return resourceRepository.findAll();
	}
}
