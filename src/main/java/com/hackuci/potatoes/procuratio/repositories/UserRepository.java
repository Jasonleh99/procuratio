package com.hackuci.potatoes.procuratio.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackuci.potatoes.procuratio.UserType;
import com.hackuci.potatoes.procuratio.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByName(String name);
	Optional<User> findByLogin(String login);
	List<User> findByUserType(UserType userType);
}
