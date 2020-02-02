package com.hackuci.potatoes.procuratio.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
@Table(name="AssignmentStudent")
public class AssignmentStudent {
	@Id
	private long id;
	
	@ManyToOne
	private Assignment assignment;
	
	@ManyToOne
	private Student student;
	
	private String submission_link;
	
	private int score;
	
	private int total_score;
}
