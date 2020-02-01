package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Parent;
import com.hackuci.potatoes.procuratio.models.Student;

public interface ParentRepository extends JpaRepository<Parent, Long> {
	Parent findByName(String name);
	Parent findByEmail(String email);
	List<Parent> findByStudent(Student student);
}
