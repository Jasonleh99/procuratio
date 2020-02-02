--  1    2     3       4         5
-- id, login, name, password, usertype (0-2)
insert into user values (1, 'john123', 'John', 'qwerty', 0);
insert into user values (2, 'kerry123', 'Kerry', 'qwerty', 0);
insert into user values (3, 'jason123', 'Jason', 'qwerty', 1);
insert into user values (4, 'gina123', 'Gina', 'qwerty', 1);
insert into user values (5, 'jimmy123', 'Jimmy', 'qwerty', 2);

-- id, classname, userid
insert into teacher values (200, 'Kingsleys Class', 5);

-- id, pairid, parentid, teacherid, userid
insert into student values (100, 'asdas', NULL, 200, 1);
insert into student values (101, 'asdas1', NULL, 200, 2);

-- id, studentid, userid
insert into parent values (300, 100, 3);
insert into parent values (301, 101, 4);

--update student values (100, 'asdas', 300, 200, 1);
--UPDATE student values (101, 'asdas1', 301, 200, 2);

-- id, body, title, teacherid
insert into resource values (400, 'body', 'title', 200);

-- id, body, title, parentid, teacherid
insert into notification values (500, 'body', 'title', 300, 200);

-- id, title, pdf_link, teacherid
insert into document values (600, 'pdf_link', 'title', 200);

-- id, score, subject, total_score, teacherid
insert into grade values (700, 100, 0, 100, 200);
insert into grade values (701, 100, 1, 100, 200);
insert into grade values (702, 100, 2, 100, 200);

-- id, body, title, teacherid
insert into announcement values (800, 'body', 'title', 200);

-- id, date, subject, summary, title, total score, teacherid
insert into assignment values (900, NULL, 1, 'add stuff', 'Simple Addition 1', 100, 200);
insert into assignment values (901, NULL, 0, 'read gud 4 u', 'Simple Reading 1', 100, 200);
insert into assignment values (902, NULL, 0, 'science of life', 'Simple Science 1', 100, 200);

-- id, score, submission_link, total_score, assignmentid, studentid
insert into assignmentstudent values (1000, 100, 'sublink.com/maf', 100, 900, 100);
insert into assignmentstudent values (1001, 100, 'sublink.com/eng', 100, 901, 100);
insert into assignmentstudent values (1002, 100, 'sublink.com/sci', 100, 902, 100);

-- id, body, timestamp, fromid, toid
insert into message values (2000, 'body', NULL, 5, 1);


