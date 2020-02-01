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

import com.hackuci.potatoes.procuratio.models.Announcement;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.AnnouncementRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
//need to make repository
	private AnnouncementRepository announcementRepository;
	private TeacherRepository teacherRepository;

public AnnouncementController(AnnouncementRepository announcementRepository) {
	super();
	this.announcementRepository = announcementRepository;
}
	

	@GetMapping("/{teacherid}")
	ResponseEntity<?> getannouncements(@PathVariable Long teacherid) {
		Optional<Teacher> teacher = teacherRepository.findById(teacherid);
		return teacher.map(response -> ResponseEntity.ok().body(
				announcementRepository.findByTeacher(response)))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		//going to get all the announcements from the repository
	}
	
	@PostMapping("/new_announcement")
	ResponseEntity<Announcement> createAnnouncement(@Valid @RequestBody Announcement announcement) throws URISyntaxException{
		Announcement result = announcementRepository.save(announcement);
		return ResponseEntity.created(new URI("/api/announcement" + result.getId())).body(result);
	}
	
}
