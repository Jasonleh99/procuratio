package com.hackuci.potatoes.procuratio.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackuci.potatoes.procuratio.repositories.ParentRepository;
import com.hackuci.potatoes.procuratio.repositories.StudentRepository;
import com.hackuci.potatoes.procuratio.repositories.TeacherRepository;

@RestController
@RequestMapping("/api")
public class BaseController {
	private StudentRepository stuRepo;
	private TeacherRepository teaRepo;
	private ParentRepository parRepo;
}
