package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hackuci.potatoes.procuratio.models.Grade;
import com.hackuci.potatoes.procuratio.models.Teacher;

public interface GradeRepository extends JpaRepository<Grade, Long>{
	List<Grade> findBySubject(String subject);
	List<Grade> findByTeacher(Teacher teacher);
	@Query("SELECT gra FROM grade WHERE gra.subject=(:subject) AND gra.teacher=(:teacher)")
	Grade findBySubjectAndTeacher(@Param("subject") String subject, @Param("teacher") Teacher teacher);
}
