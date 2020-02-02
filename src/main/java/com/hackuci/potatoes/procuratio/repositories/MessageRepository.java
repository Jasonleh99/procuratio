package com.hackuci.potatoes.procuratio.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.models.Message;
import com.hackuci.potatoes.procuratio.models.User;

public interface MessageRepository extends JpaRepository<Message, Long> {
	Optional<Message> findByFrom(User from);
	Optional<Message> findByTo(User To);
	Optional<Message> findByFromAndTo(User from, User to);
}
