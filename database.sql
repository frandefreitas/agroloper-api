-- Farm Table
CREATE TABLE farm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    city VARCHAR(100),
    state VARCHAR(50)
);

-- Person Table (an alternative to "user")
CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    gender VARCHAR(10),
    date_of_birth DATE,
    password VARCHAR(255), -- Store the password as a hash
    phone VARCHAR(15),
    email VARCHAR(255),
    person_type ENUM('Administrator', 'InternalCollaborator', 'ExternalCollaborator') NOT NULL
    FOREIGN KEY (farm_id) REFERENCES farm(id)
);

-- Instrument Table (including information about both Instruments and Machines)
CREATE TABLE instrument (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    type ENUM('Instrument', 'Machine') NOT NULL
    FOREIGN KEY (farm_id) REFERENCES farm(id)
);

-- Maintenance Table
CREATE TABLE maintenance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT, -- Reference to instrument_id
    item_type ENUM('Instrument', 'Machine'),
    person_id INT,
    hour_meter INT,
    km INT,
    revision_type ENUM('Preventive', 'Corrective'),
    summary TEXT,
    date_time DATETIME,
    action TEXT,
    FOREIGN KEY (item_id) REFERENCES instrument(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

-- Scheduling Table
CREATE TABLE scheduling (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT,
    scheduled_date_time DATETIME,
    scheduling_description TEXT,
    FOREIGN KEY (person_id) REFERENCES person(id)
);
