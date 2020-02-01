package com.hackuci.potatoes.procuratio.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Student")
public class Student extends User {

	@Id
	private String pairingid;
	
	@OneToMany
	private Set<Assignment> assignments;
	
	@OneToMany
	private Set<Grade> grades;
	
	@OneToOne
	private Parent associated_parent;
	
}
