package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Notification;
import com.hackuci.potatoes.procuratio.models.Teacher;

public interface NotificationRepository extends JpaRepository<Notification, Long>{
	List<Notification> findByTitle(String title);
	List<Notification> findByTeacher(Teacher teacher);
}
