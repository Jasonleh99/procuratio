--  1    2     3       4         5
-- id, login, name, password, usertype (0-2)
insert into user values (1, 'John', 'john123', 'qwerty', 0);
insert into user values (2, 'Bill', 'bill123', 'qwerty', 0);
insert into user values (3, 'Fill', 'Fill123', 'qwerty', 0);
insert into user values (4, 'Dill', 'Dill123', 'qwerty', 0);

-- id, pairid, parentid, teacherid, userid
insert into student values (100, 20, NULL, NULL, 1);

-- id, classname, userid
insert into teacher values (200, 'Kingsleys Class', 2);

-- id, studentid, userid
insert into parent values (300, NULL, 3);

-- id, body, title, teacherid
insert into resource values (400, 'body', 'title', NULL);

-- id, body, title, parentid, teacherid
insert into notification values (500, 'body', 'title', NULL, NULL);

-- id, pdf_link, title, teacherid
insert into document values (600, 'title', 'pdf_link', NULL);

-- id, score, subject, total_score, teacherid
insert into grade values (700, 100, 'Math', 100, NULL);

-- id, body, title, teacherid
insert into announcement values (800, 'body', 'title', NULL);

-- id, body, timestamp, fromid, toid
insert into message values (2000, 'body', NULL, NULL, NULL);





