package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Notification;
import com.hackuci.potatoes.procuratio.repositories.NotificationRepository;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	private NotificationRepository notificationRepository;
	
	public NotificationController (NotificationRepository notificationRepository) {
		super();
		this.notificationRepository = notificationRepository;
	}
	
	@GetMapping("/")
	Collection<Notification> getNotification(){
		return notificationRepository.findAll();
	}
	
	@GetMapping("/{studentId}")
	ResponseEntity<?> getNotification(@PathVariable Long studentId){
		Optional<Notification> notification= notificationRepository.findById(studentId);
		return notification.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
