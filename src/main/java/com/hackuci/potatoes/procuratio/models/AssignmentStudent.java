package com.hackuci.potatoes.procuratio.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
@Table(name="assignment_student")
public class AssignmentStudent {
	@Id
	private long id;
	
	@OneToMany
	private Assignment assignment;
	
	@OneToMany
	private Student student;
	
	private String submission_link;
	
	private int score;
	
	private int total_score;
}
