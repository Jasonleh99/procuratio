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

import com.hackuci.potatoes.procuratio.models.Notification;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.NotificationRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	private NotificationRepository notificationRepository;
	private TeacherRepository teacherRepository;
	
	public NotificationController (NotificationRepository notificationRepository) {
		super();
		this.notificationRepository = notificationRepository;
	}
	
	@GetMapping("/")
	Collection<Notification> getNotification(){
		return notificationRepository.findAll();
	}
	
	@GetMapping("/{parentId}")
	ResponseEntity<?> getNotification(@PathVariable Long parentId){
		Optional<Notification> notification= notificationRepository.findById(parentId);
		return notification.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/{teacherId}")
	ResponseEntity<?> getTNotification(@PathVariable Long teacherId){
		Optional<Teacher> teacher = teacherRepository.findById(teacherId);
		return teacher.map(response -> ResponseEntity.ok().body(notificationRepository.findByTeacher(response)))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_notification")
	ResponseEntity<Notification> createNotification(@Valid @RequestBody Notification notification) throws URISyntaxException{
		Notification result = notificationRepository.save(notification);
		return ResponseEntity.created(new URI("/api/notification"+ result.getId())).body(result);
	}
}
	
