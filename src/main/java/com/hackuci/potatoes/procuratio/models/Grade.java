package com.hackuci.potatoes.procuratio.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="grades")
public class Grade {

	@Id
	private Long id;
	
	private String subject;
	
	private int subject_average_score;
	
	private int total_score;
	
	@OneToOne
	private Student student;
	
	@ManyToOne
	private Teacher teacher;
}
