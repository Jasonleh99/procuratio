package com.hackuci.potatoes.procuratio.models;

import javax.persistence.Id;

public abstract class User {
	@Id
	public Long id;
	
	public String name;
	
	public String login;
	
	public String password;
}
