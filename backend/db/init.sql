-- Schéma complet de la BDD concuriadb avec index

CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    case_number TEXT UNIQUE,
    title TEXT,
    instrument TEXT,
    regulation TEXT,
    cartel TEXT,
    companies TEXT[],
    initiation_date DATE,
    decision_date DATE,
    simplified_procedure BOOLEAN,
    last_update TIMESTAMP,
    markets TEXT[],
    notification_date DATE,
    deadline_date DATE,
    procedure_type TEXT
);

CREATE INDEX idx_cases_case_number ON cases(case_number);
CREATE INDEX idx_cases_decision_date ON cases(decision_date);

CREATE TABLE decisions (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
    decision_number TEXT,
    adoption_date DATE,
    publication_date DATE,
    type TEXT,
    oj_reference TEXT,
    press_release TEXT,
    oj_prior_publication BOOLEAN
);

CREATE INDEX idx_decisions_case_id ON decisions(case_id);

CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    decision_id INTEGER REFERENCES decisions(id) ON DELETE CASCADE,
    link TEXT,
    name TEXT,
    language TEXT,
    sent_date DATE,
    file_text TEXT,
    attachment_location TEXT
);

CREATE INDEX idx_attachments_decision_id ON attachments(decision_id);
CREATE INDEX idx_attachments_language ON attachments(language);
CREATE INDEX idx_attachments_sent_date ON attachments(sent_date);
CREATE INDEX idx_attachments_name ON attachments(name);


CREATE TABLE sectors (
    code TEXT PRIMARY KEY,
    label TEXT,
    label_code TEXT,
    label_title TEXT
);

CREATE INDEX idx_sectors_label ON sectors(label);
CREATE INDEX idx_sectors_label_code ON sectors(label_code);

CREATE TABLE case_sectors (
    case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
    sector_code TEXT REFERENCES sectors(code) ON DELETE CASCADE,
    PRIMARY KEY (case_id, sector_code)
);

CREATE INDEX idx_case_sectors_case_id ON case_sectors(case_id);
CREATE INDEX idx_case_sectors_sector_code ON case_sectors(sector_code);

-- Nettoyage des données 'companies' si nécessaire
UPDATE cases
SET companies = string_to_array(
  regexp_replace(
    regexp_replace(companies[1], '^{""|""}$', '', 'g'),
    '\s*/\s*', ',', 'g'
  ),
  ','
)
WHERE companies[1] LIKE '{""%';

UPDATE cases
SET companies = string_to_array(
  regexp_replace(companies[1], '\s*/\s*', ',', 'g'), ','
)
WHERE array_length(companies, 1) = 1
  AND companies[1] LIKE '%/%';