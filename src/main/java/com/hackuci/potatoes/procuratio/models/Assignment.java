package com.hackuci.potatoes.procuratio.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Assignments")

public class Assignment {

	@Id
	private Long id;
	
	private String title;
	
	private String assignment_summary;
	//date object
	private String date;
	
	private String submission_link;
	
	private int score;
	
	private int total_score;
}
