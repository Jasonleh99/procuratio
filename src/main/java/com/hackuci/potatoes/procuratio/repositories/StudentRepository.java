package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Assignment;
import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	Student findByName(String name);
	Student findByLogin(String username);
	List<Student> findByParent(Parent parent);
	List<Student> findByAssignment(Assignment assignment);
}
