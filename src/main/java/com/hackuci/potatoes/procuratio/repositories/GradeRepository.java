package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.Subject;
import com.hackuci.potatoes.procuratio.models.Grade;
import com.hackuci.potatoes.procuratio.models.Teacher;

public interface GradeRepository extends JpaRepository<Grade, Long>{
	List<Grade> findBySubject(Subject subject);
	List<Grade> findByTeacher(Teacher teacher);
	Optional<Grade> findBySubjectAndTeacher(Subject subject, Teacher teacher);
}
