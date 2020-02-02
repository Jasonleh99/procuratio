package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.models.AssignmentStudent;
import com.hackuci.potatoes.procuratio.models.Student;

public interface AssignmentStudentRepository extends JpaRepository<AssignmentStudent, Long>{
	List<AssignmentStudent> findByStudent(Student student);
	List<AssignmentStudent> findByAssignment(Assignment assignment);
	
	@Query("SELECT sub FROM assignmentStudent WHERE sub.student=(:student) AND sub.assignment=(:assignment)")
	Optional<AssignmentStudent> findByStudentAndAssignment(
			@Param("student") Student student,
			@Param("assignment") Assignment assignment);
	
	@Query("SELECT sub FROM assignmentStudent WHERE sub.student=(:student) AND sub.assignment.subject=(:subject)")
	List<AssignmentStudent> findByStudentAndSubject(
			@Param("student") Student student,
			@Param("subject") String subject);
	
	@Query("SELECT sub FROM assignmentStudent WHERE sub.assignment.subject=(:subject)")
	List<AssignmentStudent> findBySubject(@Param("subject") String subject);
}
