package com.hackuci.potatoes.procuratio.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
	// Modify  to limit to specific classrooms?
	List<Assignment> findByTitle(String title);
	List<Assignment> findByDueDate(Date dueDate);
	List<Assignment> findByStudentScore(int studentScore);
	List<Assignment> findByTotalScore(int totalScore);

}
