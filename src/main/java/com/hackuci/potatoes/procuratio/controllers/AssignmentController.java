package com.hackuci.potatoes.procuratio.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
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

import com.hackuci.potatoes.procuratio.Subject;
import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.models.AssignmentStudent;
import com.hackuci.potatoes.procuratio.models.Grade;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.repositories.AssignmentRepository;
import com.hackuci.potatoes.procuratio.repositories.AssignmentStudentRepository;
import com.hackuci.potatoes.procuratio.repositories.GradeRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
	private AssignmentRepository assignmentRepository;
	private AssignmentStudentRepository asRepository;
	private StudentRepository studentRepository;
	private GradeRepository gradeRepository;
	private TeacherRepository teacherRepository;

	public AssignmentController(AssignmentRepository assignmentRepository, AssignmentStudentRepository asRepository,
			StudentRepository studentRepository, GradeRepository gradeRepository, TeacherRepository teacherRepository) {
		super();
		this.assignmentRepository = assignmentRepository;
		this.asRepository = asRepository;
		this.studentRepository = studentRepository;
		this.gradeRepository = gradeRepository;
		this.teacherRepository = teacherRepository;
	}

	@GetMapping("/student/{studentId}")
	ResponseEntity<?> getAssignment(@PathVariable Long studentId) {
		Optional<Student> student = studentRepository.findById(studentId);
		return student.map(response -> ResponseEntity.ok().body(asRepository.findByStudent(response)))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/teacher/{teacherid}")
	ResponseEntity<?> getTeacherAssignments(@PathVariable Long teacherid) {
		Optional<Teacher> teacher = teacherRepository.findById(teacherid);
		return teacher.map(response -> ResponseEntity.ok().body(assignmentRepository.findByTeacher(response)))
					.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/{studentid}/{assignmentid}")
	ResponseEntity<?> getSubmission(@PathVariable Long studentid, @PathVariable Long assignmentid) {
		Optional<Student> student = studentRepository.findById(studentid);
		Optional<Assignment> assignment = assignmentRepository.findById(assignmentid);
		if (student.isPresent() && assignment.isPresent()) {
			Optional<AssignmentStudent> submission = asRepository.findByAssignmentAndStudent(assignment.get(),
					student.get());
			return submission.map(response -> ResponseEntity.ok().body(response))
					.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/{assignmentId}")
	ResponseEntity<?> getStudentAssignment(@PathVariable Long assignmentId) {
		Optional<Assignment> assignment = assignmentRepository.findById(assignmentId);
		return assignment.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/new_assignment")
	ResponseEntity<Assignment> createAssignment(@Valid @RequestBody Assignment assignment) {
		assignmentRepository.save(assignment);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/new_assignment_submission")
	ResponseEntity<AssignmentStudent> createSubmission(@Valid @RequestBody AssignmentStudent assignmentStudent)
			throws URISyntaxException {
		AssignmentStudent result = asRepository.save(assignmentStudent);

		recalculateGrade(result.getAssignment().getSubject(),
				result.getAssignment().getTeacher());

		return ResponseEntity
				.created(new URI(
						"/api/assignment/" + result.getStudent().getId() + "/" + result.getAssignment().getId()))
				.body(result);
	}

	@PutMapping("/update_assignment")
	ResponseEntity<Assignment> updateAssignment(@Valid @RequestBody Assignment assignment) {
		Assignment result = assignmentRepository.save(assignment);
		return ResponseEntity.ok().body(result);
	}

	void recalculateGrade(Subject subject, Teacher teacher) {
		List<Assignment> subjectAssignments = assignmentRepository.findBySubject(subject);
		List<AssignmentStudent> subjectSubmissions = new ArrayList<>();
		for (Assignment ass : subjectAssignments) {
			List<AssignmentStudent> temp = asRepository.findByAssignment(ass);
			subjectSubmissions.addAll(temp);
		}

		int scoreSum = 0;
		int totalSum = 0;
		for (AssignmentStudent submission : subjectSubmissions) {
			if (submission.getAssignment().getTeacher().equals(teacher)) {
				scoreSum += submission.getScore();
				totalSum += submission.getTotal_score();
			}
		}

		Optional<Grade> grade = gradeRepository.findBySubjectAndTeacher(subject, teacher);
		grade.get().setTotal_score(totalSum);
		grade.get().setScore(scoreSum);

		gradeRepository.save(grade.get());
	}

	@PutMapping("/update_submission")
	ResponseEntity<AssignmentStudent> updateAssignmentStudent(@Valid @RequestBody AssignmentStudent assignmentStudent) {
		AssignmentStudent result = asRepository.save(assignmentStudent);

		recalculateGrade(result.getAssignment().getSubject(), result.getAssignment().getTeacher());

		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/student/{studentid}/{subject}")
	ResponseEntity<?> getSubmissionsByStudentAndSubject(@PathVariable Long studentid, @PathVariable Subject subject) {
		Optional<Student> student = studentRepository.findById(studentid);
		return student.map(response -> {
			List<Assignment> assignments = assignmentRepository.findBySubject(subject);
			List<AssignmentStudent> submissions = new ArrayList<AssignmentStudent>();
			for (Assignment assignment: assignments) {
				List<AssignmentStudent> subs = asRepository.findByAssignment(assignment);
				for (AssignmentStudent s: subs) {
					if (s.getStudent().getId().equals(studentid)) {
						submissions.add(s);
					}
				}
			}
			return ResponseEntity.ok().body(submissions);
		}).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
