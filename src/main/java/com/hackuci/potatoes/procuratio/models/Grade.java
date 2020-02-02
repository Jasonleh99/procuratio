package com.hackuci.potatoes.procuratio.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hackuci.potatoes.procuratio.Subject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="grade")
public class Grade {

	@Id
	private Long id;
	
	private Subject subject;
	
	private int score;
	
	private int total_score;
	
	@ManyToOne
	private Teacher teacher;
}
