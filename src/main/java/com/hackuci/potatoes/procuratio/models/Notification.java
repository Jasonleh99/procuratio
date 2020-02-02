package com.hackuci.potatoes.procuratio.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="notification")
public class Notification {

	@Id
	private Long id;
	
	private String title;
	
	private String body;
	
	@ManyToOne
	private Parent parent;
	
	@ManyToOne
	private Teacher teacher;
}
