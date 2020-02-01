package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Long>{
	List<Resource> findByTitle(String title);
}
