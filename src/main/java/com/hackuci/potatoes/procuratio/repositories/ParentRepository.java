package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;
import com.hackuci.potatoes.procuratio.models.User;

public interface ParentRepository extends JpaRepository<Parent, Long> {
	Optional<Parent> findByUser(User user);
	List<Parent> findByStudent(Student student);
}
