package com.hackuci.potatoes.procuratio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
	//find by from
	//find by to
}
