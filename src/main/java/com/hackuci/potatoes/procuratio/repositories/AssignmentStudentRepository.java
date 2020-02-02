package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.models.AssignmentStudent;
import com.hackuci.potatoes.procuratio.models.Student;

public interface AssignmentStudentRepository extends JpaRepository<AssignmentStudent, Long>{
	List<AssignmentStudent> findByStudent(Student student);
	List<AssignmentStudent> findByAssignment(Assignment assignment);
	Optional<AssignmentStudent> findByAssignmentAndStudent(Assignment assignment, Student student);
	void deleteByAssignmentAndStudent(Assignment assignment, Student student);
}
