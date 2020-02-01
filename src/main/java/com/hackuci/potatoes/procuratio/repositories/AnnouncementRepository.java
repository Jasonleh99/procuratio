package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long>{
	List<Announcement> findByTitle(String title);
}
