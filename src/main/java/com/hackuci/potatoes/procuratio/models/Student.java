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
public class Student extends User {

	private String pairingid;
	
	private Set<Assignment> assignments;
	
	private Set<Grade> grades;
	
	private Parent associated_parent;
	
}
