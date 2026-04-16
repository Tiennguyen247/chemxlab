CREATE TABLE IF NOT EXISTS Chemicals (
  ChemicalID SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  NameVN VARCHAR(45) NOT NULL,
  Formula VARCHAR(45),
  MolarMass DECIMAL(6,2) UNSIGNED,
  Type VARCHAR(45),
  PhysicalState ENUM('r','l','k','dd'),
  MeltingPoint DECIMAL(6,2),
  BoilingPoint DECIMAL(6,2),
  SafetyHazard VARCHAR(45),
  Color VARCHAR(10),
  IsUnlocked TINYINT UNSIGNED DEFAULT 1,
  UnlockedLevel TINYINT UNSIGNED DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Equipment (
  EquipmentID SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  NameVN VARCHAR(45),
  Sealable TINYINT UNSIGNED,
  PressureTolerance DECIMAL(6,2),
  IsHeatSource TINYINT UNSIGNED,
  MaxCapacity DECIMAL(8,2),
  FunctionType VARCHAR(45),
  IsUnlocked TINYINT UNSIGNED DEFAULT 1,
  UnlockedLevel TINYINT UNSIGNED DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Reactions (
  ReactionID SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  OptimalTemperature DECIMAL(6,2),
  ExplosiveRisk VARCHAR(20),
  ExplosiveCondition VARCHAR(45),
  RequiredCondition VARCHAR(45),
  ReactionType VARCHAR(45),
  DescriptionVN TEXT
);

CREATE TABLE IF NOT EXISTS Reaction_Chemicals (
  ReactionID SMALLINT UNSIGNED,
  ChemicalID SMALLINT UNSIGNED,
  Coefficient TINYINT UNSIGNED,
  Role ENUM('Reactant','Product'),
  PRIMARY KEY (ReactionID, ChemicalID, Role),
  FOREIGN KEY (ReactionID) REFERENCES Reactions(ReactionID),
  FOREIGN KEY (ChemicalID) REFERENCES Chemicals(ChemicalID)
);