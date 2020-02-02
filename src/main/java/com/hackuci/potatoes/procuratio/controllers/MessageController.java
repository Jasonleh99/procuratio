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
import com.hackuci.potatoes.procuratio.models.User;
import com.hackuci.potatoes.procuratio.repositories.MessageRepository;
import com.hackuci.potatoes.procuratio.repositories.UserRepository;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
	
	private MessageRepository messageRepository;
	private UserRepository userRepository;
	
	public MessageController (MessageRepository messageRepository,
			UserRepository userRepository) {
		super();
		this.messageRepository = messageRepository;
		this.userRepository = userRepository;
	}
	
	@GetMapping("/")
	Collection<Message> getMessages(){
		return messageRepository.findAll();
	}
	
	@GetMapping("/{userid}")
	ResponseEntity<?> getMessage(@PathVariable Long userid){
		Optional<User> user = userRepository.findById(userid);
		return user.map(response -> ResponseEntity.ok().body(messageRepository.findByTo(response)))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_message")
	ResponseEntity<Message> createMessage(@Valid @RequestBody Message message) throws URISyntaxException{
		Message result = messageRepository.save(message);
		return ResponseEntity.created(new URI("/api/message/" + result.getId())).body(result);
	}
	


}
