package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.models.AssignmentStudent;
import com.hackuci.potatoes.procuratio.models.Student;

public interface AssignmentStudentRepository extends JpaRepository<AssignmentStudent, Long>{
	AssignmentStudent findByStudent(Student student);
	List<AssignmentStudent> findByAssignment(Assignment assignment);
}
