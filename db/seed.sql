INSERT INTO Chemicals VALUES
(1,'Axit Clohydric','HCl',36.50,'Axit Vô Cơ','dd',-114.22,-85.05,'GHS05,GHS07','#E0F7FA',1,1),
(2,'Natri Hydroxit','NaOH',40.00,'Bazo Vô Cơ','r',318.00,1390.00,'GHS05','#F5F5F5',1,1),
(3,'Axit Sunfuric','H2SO4',98.00,'Axit Vô Cơ','l',10.30,337.00,'GHS05,H314','#0000FF',1,1),
(4,'Natri Clorua','NaCl',58.50,'Muối','r',801.00,1413.00,NULL,'#efeeee',1,1),
(5,'Bari Sunfat','BaSO4',233.00,'Muối','r',1580.00,NULL,NULL,'#ffffffaf',1,1);

INSERT INTO Reactions VALUES
(1,25.00,'Thấp',NULL,NULL,'Trung hòa','HCl + NaOH → NaCl + H₂O. Phản ứng tỏa nhiệt, dung dịch chuyển trong suốt.'),
(2,25.00,'Trung bình',NULL,NULL,'Trung hòa','H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Tỏa nhiệt mạnh, nguy hiểm.');

INSERT INTO Reaction_Chemicals VALUES
(1,1,1,'Reactant'),
(1,2,1,'Reactant'),
(1,4,1,'Product'),
(2,3,1,'Reactant'),
(2,2,2,'Reactant');