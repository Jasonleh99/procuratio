package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Document;

public interface DocumentRepository extends JpaRepository<Document, Long>{
	List<Document> findByTitle(String title);
}
