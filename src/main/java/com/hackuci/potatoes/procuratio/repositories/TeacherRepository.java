package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.models.User;

public interface TeacherRepository extends JpaRepository<Teacher, Long>{
	Optional<Teacher> findByUser(User user);
	Optional<Teacher> findByClass(String className);
	List<Teacher> findByStudent(Student student);
}
