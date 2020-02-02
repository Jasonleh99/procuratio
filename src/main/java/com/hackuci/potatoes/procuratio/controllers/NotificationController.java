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

import com.hackuci.potatoes.procuratio.models.Notification;
import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.NotificationRepository;
import com.hackuci.potatoes.procuratio.repositories.ParentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

	private NotificationRepository notificationRepository;
	private TeacherRepository teacherRepository;
	private ParentRepository parentRepository;
	
	public NotificationController (NotificationRepository notificationRepository,
			TeacherRepository teacherRepository,
			ParentRepository parentRepository) {
		super();
		this.notificationRepository = notificationRepository;
		this.teacherRepository = teacherRepository;
		this.parentRepository = parentRepository;
	}
	
	@GetMapping("/")
	Collection<Notification> getNotification(){
		return notificationRepository.findAll();
	}
	
	@GetMapping("/parent/{parentid}")
	ResponseEntity<?> getNotificationparent(@PathVariable Long parentid){
		Optional<Parent> parent = parentRepository.findById(parentid);
		return parent.map(response -> ResponseEntity.ok().body(notificationRepository.findByParent(response)))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/teacher/{teacherid}")
	ResponseEntity<?> getNotificationteacher(@PathVariable Long teacherid){
		Optional<Teacher> teacher = teacherRepository.findById(teacherid);
		return teacher.map(response -> ResponseEntity.ok().body(notificationRepository.findByTeacher(response)))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_notification")
	ResponseEntity<Notification> createNotification(@Valid @RequestBody Notification notification) throws URISyntaxException{
		Notification result = notificationRepository.save(notification);
		return ResponseEntity.created(new URI("/api/notification/"+ result.getId())).body(result);
	}
	
	@PutMapping("/new_notification")
	ResponseEntity<Notification> updateNotification(@Valid @RequestBody Notification notification){
		Notification result = notificationRepository.save(notification);
		return ResponseEntity.ok().body(result);
	}
}
	
