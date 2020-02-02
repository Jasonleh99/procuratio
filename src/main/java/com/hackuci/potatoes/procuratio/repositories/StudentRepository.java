package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.Teacher;
import com.hackuci.potatoes.procuratio.models.User;

public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByUser(User user);
	Optional<Student> findByParent(Parent parent);
	List<Student> findByTeacher(Teacher teacher);
	Optional<Student> findByPairid(String pairid);
}
