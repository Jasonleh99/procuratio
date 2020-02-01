package com.hackuci.potatoes.procuratio.models;

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

public class Teacher extends User {

	private String classroom_name;
	
	private Set<Student> class_roster;
}
