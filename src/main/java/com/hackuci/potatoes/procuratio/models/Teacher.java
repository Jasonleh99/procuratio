package com.hackuci.potatoes.procuratio.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hackuci.potatoes.procuratio.UserType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="teacher")
public class Teacher{
	
	@Id
	private Long id;
	
	@OneToOne
	private User user;

	private String classroomName;
	
	@OneToMany
	private Set<Student> class_roster;
	
	@OneToMany
	private Set<Announcement> announcements;
	
	@OneToMany
	private Set<Document> documents;
	
	@OneToMany
	private Set<Assignment> assignments;
	
	@OneToMany
	private Set<Grade> grades;
	
	@OneToMany
	private Set<Resource> resources;
	
	@OneToMany
	private Set<Notification> notifications;
	
}
