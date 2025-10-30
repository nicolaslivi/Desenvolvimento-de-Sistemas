use api_aula_db;

create table if not exists usuarios (
	idUsuarios int auto_increment primary key,
    nome varchar(255) not null,
    email varchar(255) not null
);

insert into usuarios (nome, email) values 
('Nicolas Rodolfo Liviera', 'nicolasrlivi@gmail.com'),
('Julia Filipp', 'juliafilipp13@gmail.com');

create table if not exists tarefas (
	idTarefas int auto_increment primary key,
    titulo varchar(255) not null,
    descricao varchar(255) not null,
    concluida boolean not null
);

insert into tarefas (titulo, descricao, concluida) values
('estudar banco de dados', 'revisar todo o conteudo de banco de dados com mysql', false),
('estudar node', 'revisar todo o conteudo abordado do node', true),
('estudar js', 'revisar todo o conteudo de javascript', false);

alter table tarefas
	add column fk_idUsuarios int;

alter table tarefas
	add constraint fk_idUsuarios
	foreign key (fk_idUsuarios)
	references usuarios(idUsuarios);

create table if not exists dados_usuarios (
	biografia varchar(500) not null,
    url_foto varchar(255) not null,
    data_nascimento date not null,
    telefone char(11) not null
);

insert into dados_usuarios (biografia, url_foto, data_nascimento, telefone) values
('Moro em Nereu Ramos e tenho 20 anos', 'sem foto', "2005-03-30", '47997078117'),
('Moro no Braço do Ribeirão Cavalo e tenho 20 anos', 'sem foto', "2005-01-06", '47912345678');

alter table dados_usuarios
	add column fk_idUsuarios int;

alter table dados_usuarios
	add constraint fk_idUsuarios
	foreign key (fk_idUsuarios)
	references usuarios(idUsuarios);

create table if not exists categorias (
	idCategorias int auto_increment primary key,
    nome varchar(255) not null
);

insert into categorias (nome) values 
('Curso Técnico'),
('Faculdade');

create table if not exists tarefas_categorias (
	idTarefas int not null,
    idCategorias int not null,
	constraint fk_idTarefas 
		foreign key (idTarefas) references tarefas(idTarefas),
    constraint fk_idCategorias 
		foreign key (idCategorias) references categorias(idCategorias)
);