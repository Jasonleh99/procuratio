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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Message;
import com.hackuci.potatoes.procuratio.repositories.MessageRepository;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
	
	private MessageRepository messageRepository;	
	
	public MessageController (MessageRepository messageRepository) {
		super();
		this.messageRepository = messageRepository;
	}
	
	@GetMapping("/")
	Collection<Message> getMessages(){
		return messageRepository.findAll();
	}
	
	@GetMapping("/{studentOrParentId}")
	ResponseEntity<?> getMessage(@PathVariable Long studentOrParentId){
		Optional<Message> message = messageRepository.findById(studentOrParentId);
		return message.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_message")
	ResponseEntity<Message> createMessage(@Valid @RequestBody Message message) throws URISyntaxException{
		Message result = messageRepository.save(message);
		return ResponseEntity.created(new URI("/api/message")).body(result);
	}


}
