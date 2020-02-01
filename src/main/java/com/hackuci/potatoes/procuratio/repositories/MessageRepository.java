package com.hackuci.potatoes.procuratio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
	//find by from
	//find by to
}
