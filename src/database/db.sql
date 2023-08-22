CREATE TABLE family(
    family_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    PRIMARY KEY(family_id)
    
);

CREATE TABLE genus(
    genus_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    PRIMARY KEY(genus_id),
    family_id INT,
    CONSTRAINT fk_family FOREIGN KEY (family_id) REFERENCES family(family_id)
);

CREATE TABLE species(
    species_id INT GENERATED ALWAYS AS IDENTITY,
    cientificname VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    irrigation VARCHAR(255),
    description VARCHAR(1000),
    publish BOOLEAN,
    img VARCHAR(255),
    PRIMARY KEY(species_id),
    genus_id INT,
    CONSTRAINT fk_genus FOREIGN KEY (genus_id) REFERENCES genus(genus_id)
);

CREATE TABLE stock(
    stock_id INT GENERATED ALWAYS AS IDENTITY,
    amount INT NOT NULL,
    price INT NOT NULL,
    size VARCHAR(200) NOT NULL,
    species_id INT NOT NULL,
    CONSTRAINT fk_species FOREIGN KEY (species_id) REFERENCES species(species_id)
);

CREATE TABLE usuario(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    token VARCHAR(50) NOT NULL
);

INSERT INTO family (name,description) VALUES ('Crassulaceae','Las crasuláceas forman una gran familia de plantas del orden Saxifragales. Generalmente son plantas herbáceas, algunas subarbustivas y relativamente pocas arbóreas o acuáticas. Están extendidas mundialmente, pero mayoritariamente en el hemisferio norte y África meridional.');
INSERT INTO family (name,description) VALUES ('Cactaceae','Las cactáceas, conocidas como cactus o cactos, es una familia de plantas originarias de América. Sin embargo, hay una excepción, Rhipsalis baccifera, que está extendida en África tropical, Madagascar y Ceilán.');

INSERT INTO genus (name,description,family_id) VALUES('Crassula','Crassula es un género de plantas crasas con 620 especies, perteneciente a la familia Crassulaceae. Es nativo de muchas partes del globo, pero las variedades cultivadas son casi exclusivamente de Sudáfrica.',1);
INSERT INTO genus (name,description,family_id) VALUES('Echinocactus ','Echinocactus (del latín echinus 'erizo') es un género de cactáceas proveniente de México y el sur de Estados Unidos. Consta de seis especies en dos subgéneros: Echinocactus y Homalocephala.',2);

INSERT INTO usuario (name, password, token) VALUES('admin', '1234', 'token385434154');