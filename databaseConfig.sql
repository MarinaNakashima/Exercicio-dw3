--criar tabela salasdeaula
CREATE TABLE IF NOT EXISTS salasdeaula (
    salasdeaulaid bigserial CONSTRAINT pk_salasdeaula PRIMARY KEY,
    descricao VARCHAR(50),
    localizacao VARCHAR(40),
    capacidade integer,
    removido boolean
);

INSERT INTO salasdeaula VALUES 
    (default, 'Sala Informática', 'Bloco 1', 50, false),
    (default, 'Sala Matemática', 'Bloco 2', 40, false)
    ON CONFLICT DO NOTHING;
