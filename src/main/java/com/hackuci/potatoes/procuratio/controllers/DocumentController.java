package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Document;
import com.hackuci.potatoes.procuratio.repositories.DocumentRepository;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
	private DocumentRepository documentRepository;
	
	public DocumentController (DocumentRepository documentRepository) {
		super();
		this.documentRepository = documentRepository;
	
	}
	
	@GetMapping("/")
	Collection<Document> getDocuments(){
		return documentRepository.findAll();
	}

}
