package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long>{
	List<Announcement> findByTitle(String title);
}
