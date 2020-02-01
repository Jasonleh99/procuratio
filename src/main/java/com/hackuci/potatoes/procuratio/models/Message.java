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
@Table(name="Messages")
public class Message {

	private Long id;
	
	private User from;
	
	private User to;
	
	private String body;
	//create date object
	private String timestamp;
}
