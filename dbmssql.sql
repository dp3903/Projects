create table item(
    item_id varchar2(10) primary key,
    season_name varchar2(10) check (season_name in ('summer','winter','monsoon','autumn','spring','any'))
);


create table product(
    P_id integer primary key,
    P_name varchar2(60) NOT NULL,
    item_id varchar2(10) not null references item(item_id),
    cost_price integer not null,
    sell_price integer not null,
);



create table flowers(
    Fl_id varchar2(10),
    Fl_name varchar2(60) not null,
    FOREIGN KEY (Fl_id) references item
);

create table fruits(
    Fr_id varchar2(10),
    Fr_name varchar2(60) not null,
    FOREIGN KEY (Fr_id) references item
);

create table dairies(
    D_id varchar2(10),
    D_name varchar2(60) not null,
    FOREIGN KEY (D_id) references item
);





create table addresses(
    add_id INTEGER PRIMARY KEY,
    BLOCK VARCHAR(10) NOT NULL,
    STREET VARCHAR(25) NOT NULL,
    LOCALITY VARCHAR(30) ,
    CITY VARCHAR(25) NOT NULL,
    PINCODE INTEGER NOT NULL CHECK(PINCODE <= 999999 AND PINCODE >=100000),
    STATE VARCHAR(25) NOT NULL,
    COUNTRY VARCHAR(25) NOT NULL
);

create table gardener(
    G_id integer primary key,
    G_name varchar2(60) not null,
    wage_per_hour integer,
    hours_per_week integer
);

create table seller(
    S_id integer primary key,
    S_name varchar2(60) not null,
    add_id integer,
    profit_percent integer,
    FOREIGN KEY (add_id)  references addresses(add_id)
);

create table produces(
    G_id integer,
    p_id integer,
    foreign key (G_id) references gardener(G_id),
    foreign key (p_id) references product(P_id)
);

create table sells(
    S_id integer,
    p_id integer,
    foreign key (S_id) references seller(S_id), 
    foreign key (p_id) references product(P_id)
); 




INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (1, 123, 'Main Street', 'XYZ Colony', 'Mumbai', 400000, 'Maharashtra', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (2, 456, 'Park Avenue', 'ABC Nagar', 'Delhi', 110001, 'Delhi', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (3, 789, 'Ocean Drive', 'LMN Society', 'Goa', 403001, 'Goa', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (4, 987, 'River Road', 'PQR Colony', 'Chennai', 600000, 'Tamil Nadu', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (5, 654, 'Mountain View', 'STU Nagar', 'Hyderabad', 500032, 'Telangana', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (6, 321, 'Desert Drive', 'VWX Society', 'Jaipur', 302001, 'Rajasthan', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (7, 741, 'Highway Road', 'YZ Colony', 'Kolkata', 700064, 'West Bengal', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (8, 852, 'Beach Drive', 'AB Society', 'Vishakapatnam', 530001, 'Andhra Pradesh', 'India');
  INSERT INTO addresses (add_id, block, street, locality, city, pincode, state, country)
VALUES 
  (9, 963, 'Meadow Lane', 'CD Nagar', 'Lucknow', 226001, 'Uttar Pradesh', 'India');
 

INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (501, 'John Doe', 2, 12);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (502, 'Jane Smith', 1, 23);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (503, 'Bob Brown', 3, 26);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (504, 'Alice Smith', 5, 17);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (505, 'Tom Jones', 4, 15);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (506, 'Sarah Johnson', 6, 19);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (507, 'Michael Davis', 7, 23);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (508, 'Emily Martinez', 8, 25);
  INSERT INTO seller (s_id, s_name, add_id, profit_percent)
VALUES 
  (509, 'William Anderson', 9, 18);



INSERT INTO gardener
VALUES
    (101,'Dhruv',50,72);
    INSERT INTO gardener
VALUES
    (102,'Abc',51,73);
    INSERT INTO gardener
VALUES
    (103,'Def',52,74);
    INSERT INTO gardener
VALUES
    (104,'Pqr',53,75);
    INSERT INTO gardener
VALUES
    (105,'Xyz',54,76);



INSERT INTO product
VALUES
    (001,'Dhruv apple','fr401',80,100);
    INSERT INTO product
VALUES
    (002,'Abc apple','fr401',90,110);
    INSERT INTO product
VALUES
    (003,'Def banana','fr402',85,100);
    INSERT INTO product
VALUES
    (004,'Dhruv mango','fr403',80,110);
    INSERT INTO product
VALUES
    (005,'Abc papaya','fr404',70,105);
    INSERT INTO product
VALUES
    (006,'Pqr papaya','fr404',75,115);
    INSERT INTO product
VALUES
    (007,'Abc grapes','fr405',75,120);
    INSERT INTO product
VALUES
    (008,'Xyz cow-milk','dr406',90,120);
    INSERT INTO product
VALUES
    (009,'Xyz buffallo-milk','dr407',85,110);
    INSERT INTO product
VALUES
    (010,'Def buffallo-milk','dr407',95,115);
    INSERT INTO product
VALUES
    (011,'Dhruv buffallo-milk','dr407',70,100);
    INSERT INTO product
VALUES
    (012,'Pqr buffallo-milk','dr407',75,105);
    INSERT INTO product
VALUES
    (013,'Abc cheese','dr408',95,110);
    INSERT INTO product
VALUES
    (014,'Pqr butter','dr409',60,110);
    INSERT INTO product
VALUES
    (015,'Def buttermilk','dr410',65,120);
    INSERT INTO product
VALUES
    (016,'Dhruv rose','fl411',50,105);
    INSERT INTO product
VALUES
    (017,'Dhruv marigold','fl412',60,110);
    INSERT INTO product
VALUES
    (018,'Def marigold','fl412',65,115);
    INSERT INTO product
VALUES
    (019,'Pqr marigold','fl412',55,115);
    INSERT INTO product
VALUES
    (020,'Abc hibiscus','fl413',50,100);
    INSERT INTO product
VALUES
    (021,'Xyz jasmine','fl414',75,120);
    INSERT INTO product
VALUES
    (022,'Abc lotus','fl415',95,125);
    INSERT INTO product
VALUES
    (023,'Dhruv ghee','dr416',80,120);
    INSERT INTO product
VALUES
    (024,'Def goat-milk','dr417',85,130);
    INSERT INTO product
VALUES
    (025,'Abc goat-milk','dr417',70,100);
    INSERT INTO product
VALUES
    (026,'Def goat-milk','dr417',65,110);
    INSERT INTO product
VALUES
    (027,'Pqr cream','dr418',60,105);
    INSERT INTO product
VALUES
    (028,'Xyz eggs','dr419',80,110);
    INSERT INTO product
VALUES
    (029,'Xyz watermelon','fr420',90,100);



INSERT INTO item VALUES ('fr401','winter');
INSERT INTO item VALUES ('fr402','any');
INSERT INTO item VALUES ('fr403','summer');
INSERT INTO item VALUES ('fr404','summer');
INSERT INTO item VALUES ('fr405','winter');
INSERT INTO item VALUES ('dr406','any');
INSERT INTO item VALUES ('dr407','any');
INSERT INTO item VALUES ('dr408','any');
INSERT INTO item VALUES ('dr409','any');
INSERT INTO item VALUES ('dr410','any');
INSERT INTO item VALUES ('fl411','monsoon');
INSERT INTO item VALUES ('fl412','autumn');
INSERT INTO item VALUES ('fl413','winter');
INSERT INTO item VALUES ('fl414','summer');
INSERT INTO item VALUES ('fl415','summer');
INSERT INTO item VALUES ('dr416','any');
INSERT INTO item VALUES ('dr417','any');
INSERT INTO item VALUES ('dr418','any');
INSERT INTO item VALUES ('dr419','any');
INSERT INTO item VALUES ('fr420','summer');




INSERT INTO fruits VALUES
('fr401', 'Apple');
INSERT INTO fruits VALUES
('fr402', 'Banana');
INSERT INTO fruits VALUES
('fr403', 'Mango');
INSERT INTO fruits VALUES
('fr404', 'Papaya');
INSERT INTO fruits VALUES
('fr405', 'Grapes');
INSERT INTO fruits VALUES
('fr420', 'Watermelon');

INSERT INTO flowers VALUES
('fl411','Rose');
INSERT INTO flowers VALUES
('fl412','Marigold');
INSERT INTO flowers VALUES
('fl413','Hibiscus');
INSERT INTO flowers VALUES
('fl414','Jasmin');
INSERT INTO flowers VALUES
('fl415','Lotus');

INSERT INTO dairies VALUES
('dr406','Cow-milk');
INSERT INTO dairies VALUES
('dr407','Buffallo-milk');
INSERT INTO dairies VALUES
('dr408','Cheese');
INSERT INTO dairies VALUES
('dr409','Butter');
INSERT INTO dairies VALUES
('dr410','Buttermilk');
INSERT INTO dairies VALUES
('dr416','Ghee');
INSERT INTO dairies VALUES
('dr417','Goat-milk');
INSERT INTO dairies VALUES
('dr418','Cream');
INSERT INTO dairies VALUES
('dr419','Eggs');

INSERT INTO produces VALUES (101,001);
INSERT INTO produces VALUES (101,004);
INSERT INTO produces VALUES (101,011);
INSERT INTO produces VALUES (101,016);
INSERT INTO produces VALUES (101,017);
INSERT INTO produces VALUES (101,023);
INSERT INTO produces VALUES (102,002);
INSERT INTO produces VALUES (102,005);
INSERT INTO produces VALUES (102,007);
INSERT INTO produces VALUES (102,013);
INSERT INTO produces VALUES (102,020);
INSERT INTO produces VALUES (102,022);
INSERT INTO produces VALUES (102,025);
INSERT INTO produces VALUES (103,003);
INSERT INTO produces VALUES (103,010);
INSERT INTO produces VALUES (103,015);
INSERT INTO produces VALUES (103,018);
INSERT INTO produces VALUES (103,024);
INSERT INTO produces VALUES (103,026);
INSERT INTO produces VALUES (104,006);
INSERT INTO produces VALUES (104,012);
INSERT INTO produces VALUES (104,014);
INSERT INTO produces VALUES (104,019);
INSERT INTO produces VALUES (104,027);
INSERT INTO produces VALUES (105,008);
INSERT INTO produces VALUES (105,009);
INSERT INTO produces VALUES (105,021);
INSERT INTO produces VALUES (105,028);
INSERT INTO produces VALUES (105,029);

INSERT INTO sells VALUES (501,001);
INSERT INTO sells VALUES (501,002);
INSERT INTO sells VALUES (501,003);
INSERT INTO sells VALUES (502,004);
INSERT INTO sells VALUES (502,005);
INSERT INTO sells VALUES (502,006);
INSERT INTO sells VALUES (503,007);
INSERT INTO sells VALUES (503,008);
INSERT INTO sells VALUES (503,009);
INSERT INTO sells VALUES (504,010);
INSERT INTO sells VALUES (504,011);
INSERT INTO sells VALUES (504,012);
INSERT INTO sells VALUES (505,013);
INSERT INTO sells VALUES (505,014);
INSERT INTO sells VALUES (505,015);
INSERT INTO sells VALUES (506,016);
INSERT INTO sells VALUES (506,017);
INSERT INTO sells VALUES (506,018);
INSERT INTO sells VALUES (507,019);
INSERT INTO sells VALUES (507,020);
INSERT INTO sells VALUES (507,021);
INSERT INTO sells VALUES (508,022);
INSERT INTO sells VALUES (508,023);
INSERT INTO sells VALUES (508,024);
INSERT INTO sells VALUES (509,025);
INSERT INTO sells VALUES (509,026);
INSERT INTO sells VALUES (509,027);
INSERT INTO sells VALUES (503,028);
INSERT INTO sells VALUES (506,029);


-- selecting all the gardeners that produce buttermilk

-- Method-1
select * from gardener where g_id = (select g_id from produces where p_id = (select p_id from product where item_id = (select d_id from dairies where d_name = 'Buttermilk')));

-- Method-2
select unique g_id,g_name,wage_per_hour,hours_per_week from gardener natural join produces natural join product where item_id = (select d_id from dairies where d_name = 'Buttermilk');


-- selecting all the gardeners that produce at least one of the flowers
select unique g_id,g_name from gardener natural join produces natural join product where item_id like 'fl%' order by g_id; 


-- selecting sellers selling multiple fruits
select s_id,count(unique fr_id) as Num_of_fruits from sells natural join product natural join item natural join fruits where fr_id = item_id group by s_id having count(unique fr_id) > 1;


-- selecting all the items that are produced in summer
select ITEM_ID,FR_NAME as item_name from item natural join fruits where fr_id = item_id and season_name in ('summer','any') 
    union
select item_id,fl_name as item_name from item natural join flowers where fl_id = item_id and season_name in ('summer','any') 
    union
select item_id, d_name as item_name  from item natural join dairies where d_id = item_id and season_name in ('summer','any') ;
