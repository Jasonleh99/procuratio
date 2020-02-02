package com.hackuci.potatoes.procuratio.models;

import java.sql.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="assignments")
public class Assignment {

	@Id
	private Long id;
	
	private String title;
	
	private String summary;
	
	private String subject;
	
	private Date date;
	
	@ManyToOne
	private Teacher teacher;
}
