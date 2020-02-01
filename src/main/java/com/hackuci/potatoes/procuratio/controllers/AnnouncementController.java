package com.hackuci.potatoes.procuratio.controllers;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Announcement;
import com.hackuci.potatoes.procuratio.repositories.AnnouncementRepository;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
//need to make repository
	private AnnouncementRepository announcementRepository;

public AnnouncementController(AnnouncementRepository announcementRepository) {
	super();
	this.announcementRepository = announcementRepository;
}
	

	@GetMapping("/")
	Collection<Announcement> getannouncements() {
		return announcementRepository.findAll();
		//going to get all the announcements from the repository
	}
	
	
}
