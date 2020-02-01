package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long>{
	Teacher findByName(String name);
	Teacher findByClass(String className);
	List<Teacher> findByStudent(Student student);
}
