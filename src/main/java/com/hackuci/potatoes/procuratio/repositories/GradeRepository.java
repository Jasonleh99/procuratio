package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long>{
	List<Grade> findBySubject(String subject);
	// sum of all student scores in subject
	// sum of total score in subject
}
