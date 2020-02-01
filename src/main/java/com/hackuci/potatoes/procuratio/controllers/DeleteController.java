package com.hackuci.potatoes.procuratio.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.repositories.AnnouncementRepository;
import com.hackuci.potatoes.procuratio.repositories.AssignmentStudentRepository;
import com.hackuci.potatoes.procuratio.repositories.DocumentRepository;
import com.hackuci.potatoes.procuratio.repositories.NotificationRepository;
import com.hackuci.potatoes.procuratio.repositories.ResourceRepository;

@RestController
@RequestMapping("/api/delete")
public class DeleteController {
	private AssignmentStudentRepository asRepository;
	private AnnouncementRepository anRepository;
	private ResourceRepository reRepository;
	private NotificationRepository noRepository;
	private DocumentRepository doRepository;
	
	public DeleteController(
			AssignmentStudentRepository asRepository,
			AnnouncementRepository anRepository,
			ResourceRepository reRepository,
			NotificationRepository noRepository,
			DocumentRepository doRepository) {
		super();
		this.asRepository = asRepository;
		this.anRepository = anRepository;
		this.reRepository = reRepository;
		this.noRepository = noRepository;
		this.doRepository = doRepository;
	}
	
	@DeleteMapping("/submission/{assignmentid}/{studentid}")
	ResponseEntity<?> deleteSubmission(
			@PathVariable Long assignmentid, 
			@PathVariable Long studentid) {
		//TODO: delete by assignmentid + studentid
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/announcement/{announcementid}")
	ResponseEntity<?> deleteAnnouncement(
			@PathVariable Long announcementid) {
		anRepository.deleteById(announcementid);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/resource/{resourceid}")
	ResponseEntity<?> deleteResource(
			@PathVariable Long resourceid) {
		reRepository.deleteById(resourceid);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/notification/{notificationid}")
	ResponseEntity<?> deleteNotification(
			@PathVariable Long notificationid) {
		noRepository.deleteById(notificationid);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/document/{documentid}")
	ResponseEntity<?> deleteDocument(
			@PathVariable Long documentid) {
		doRepository.deleteById(documentid);
		return ResponseEntity.ok().build();
	}
}
