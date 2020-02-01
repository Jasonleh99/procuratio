package com.hackuci.potatoes.procuratio.models;

import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Student Grades")

public class Grade {

	private Long id;
	
	private String subject;
	
	private int subject_average_score;
	
	private int total_score;
}
