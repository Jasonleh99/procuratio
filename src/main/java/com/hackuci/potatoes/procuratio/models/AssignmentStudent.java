package com.hackuci.potatoes.procuratio.models;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
@Table(name="assignment_student")
public class AssignmentStudent {
	@OneToOne
	private Assignment assignment;
	
	@OneToOne
	private Student student;
	
	private String submission_link;
	
	private int score;
	
	private int total_score;
}
