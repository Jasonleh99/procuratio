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
@Table(name="Document")
public class Document {

	@Id
	private Long id;
	
	private String title;
	
	private String pdf_link;
	
	@ManyToOne
	private Teacher teacher;
}
