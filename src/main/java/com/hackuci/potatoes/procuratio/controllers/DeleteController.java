package com.hackuci.potatoes.procuratio.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.models.AssignmentStudent;
import com.hackuci.potatoes.procuratio.models.Grade;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.AnnouncementRepository;
import com.hackuci.potatoes.procuratio.repositories.AssignmentRepository;
import com.hackuci.potatoes.procuratio.repositories.AssignmentStudentRepository;
import com.hackuci.potatoes.procuratio.repositories.DocumentRepository;
import com.hackuci.potatoes.procuratio.repositories.GradeRepository;
import com.hackuci.potatoes.procuratio.repositories.NotificationRepository;
import com.hackuci.potatoes.procuratio.repositories.ResourceRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;

@RestController
@RequestMapping("/api/delete")
public class DeleteController {
	private AssignmentRepository asRepo;
	private AssignmentStudentRepository astRepo;
	private AnnouncementRepository anRepo;
	private ResourceRepository reRepo;
	private NotificationRepository noRepo;
	private DocumentRepository doRepo;
	private StudentRepository stRepo;
	private GradeRepository grRepo;
	
	public DeleteController(
			AssignmentRepository asRepo,
			AssignmentStudentRepository astRepository,
			AnnouncementRepository anRepository,
			ResourceRepository reRepository,
			NotificationRepository noRepository,
			DocumentRepository doRepository,
			StudentRepository stRepo,
			GradeRepository grRepo) {
		super();
		this.asRepo = asRepo;
		this.astRepo = astRepository;
		this.anRepo = anRepository;
		this.reRepo = reRepository;
		this.noRepo = noRepository;
		this.doRepo = doRepository;
		this.stRepo = stRepo;
		this.grRepo = grRepo;
	}
	
	@DeleteMapping("/submission/{assignmentid}/{studentid}")
	ResponseEntity<?> deleteSubmission(
			@PathVariable Long assignmentid, 
			@PathVariable Long studentid) {
		
		Optional<Student> student = stRepo.findById(studentid);
		Optional<Assignment> assignment = asRepo.findById(assignmentid);
		
		if (student.isPresent() && assignment.isPresent()) {
			Optional<AssignmentStudent> submission =
					astRepo.findByStudentAndAssignment(student.get(), assignment.get());
			
			submission.map(response -> {
				String subject = response.getAssignment().getSubject();
				Teacher teacher = response.getAssignment().getTeacher();
				astRepo.delete(response);
				recalculateGrade(subject, teacher);
				return ResponseEntity.ok().build();
			}).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	void recalculateGrade(String subject, Teacher teacher) {
		List<AssignmentStudent> subjectAssignments = astRepo.findBySubject(subject);
		int scoreSum = 0;
		int totalSum = 0;
		for (AssignmentStudent submission: subjectAssignments) {
			if (submission.getAssignment().getTeacher().equals(teacher)) {
				scoreSum += submission.getScore();
				totalSum += submission.getTotal_score();
			}
		}
		
		Grade grade = grRepo.findBySubjectAndTeacher(subject, teacher);
		grade.setTotal_score(totalSum);
		grade.setScore(scoreSum);
		
		grRepo.save(grade);
	}
	
	@DeleteMapping("/announcement/{announcementid}")
	ResponseEntity<?> deleteAnnouncement(
			@PathVariable Long announcementid) {
		anRepo.deleteById(announcementid);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/resource/{resourceid}")
	ResponseEntity<?> deleteResource(
			@PathVariable Long resourceid) {
		reRepo.deleteById(resourceid);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/notification/{notificationid}")
	ResponseEntity<?> deleteNotification(
			@PathVariable Long notificationid) {
		noRepo.deleteById(notificationid);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/document/{documentid}")
	ResponseEntity<?> deleteDocument(
			@PathVariable Long documentid) {
		doRepo.deleteById(documentid);
		return ResponseEntity.ok().build();
	}
}
