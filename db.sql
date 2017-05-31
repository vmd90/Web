--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

CREATE DATABASE projeto;
\c projeto;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "group" (
    name text NOT NULL,
    bio text,
    owner integer NOT NULL,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE "group" OWNER TO postgres;

--
-- Name: group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE group_id_seq OWNER TO postgres;

--
-- Name: group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE group_id_seq OWNED BY "group".id;


--
-- Name: group_posts__post_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE group_posts__post_groups (
    id integer NOT NULL,
    group_posts integer,
    post_groups integer
);


ALTER TABLE group_posts__post_groups OWNER TO postgres;

--
-- Name: group_posts__post_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE group_posts__post_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE group_posts__post_groups_id_seq OWNER TO postgres;

--
-- Name: group_posts__post_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE group_posts__post_groups_id_seq OWNED BY group_posts__post_groups.id;


--
-- Name: group_users__user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE group_users__user_groups (
    id integer NOT NULL,
    group_users integer,
    user_groups integer
);


ALTER TABLE group_users__user_groups OWNER TO postgres;

--
-- Name: group_users__user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE group_users__user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE group_users__user_groups_id_seq OWNER TO postgres;

--
-- Name: group_users__user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE group_users__user_groups_id_seq OWNED BY group_users__user_groups.id;


--
-- Name: theme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE theme (
    theme text NOT NULL,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE theme OWNER TO postgres;

--
-- Name: theme_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE theme_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE theme_id_seq OWNER TO postgres;

--
-- Name: theme_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE theme_id_seq OWNED BY theme.id;


--
-- Name: theme_posts__post_themes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE theme_posts__post_themes (
    id integer NOT NULL,
    theme_posts integer,
    post_themes integer
);


ALTER TABLE theme_posts__post_themes OWNER TO postgres;

--
-- Name: theme_posts__post_themes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE theme_posts__post_themes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE theme_posts__post_themes_id_seq OWNER TO postgres;

--
-- Name: theme_posts__post_themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE theme_posts__post_themes_id_seq OWNED BY theme_posts__post_themes.id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post (
    tittle text NOT NULL,
    text text NOT NULL,
    "user" integer NOT NULL,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE post OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE post_id_seq OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE post_id_seq OWNED BY post.id;


--
-- Name: post_reacted__user_reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post_reacted__user_reactions (
    id integer NOT NULL,
    post_reacted integer,
    user_reactions integer
);


ALTER TABLE post_reacted__user_reactions OWNER TO postgres;

--
-- Name: post_reacted__user_reactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE post_reacted__user_reactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE post_reacted__user_reactions_id_seq OWNER TO postgres;

--
-- Name: post_reacted__user_reactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE post_reacted__user_reactions_id_seq OWNED BY post_reacted__user_reactions.id;


--
-- Name: post_shared__user_shared; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post_shared__user_shared (
    id integer NOT NULL,
    post_shared integer,
    user_shared integer
);


ALTER TABLE post_shared__user_shared OWNER TO postgres;

--
-- Name: post_shared__user_shared_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE post_shared__user_shared_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE post_shared__user_shared_id_seq OWNER TO postgres;

--
-- Name: post_shared__user_shared_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE post_shared__user_shared_id_seq OWNED BY post_shared__user_shared.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    birthday text NOT NULL,
    bio text NOT NULL,
    photo text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: user_follower__user_follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_follower__user_follows (
    id integer NOT NULL,
    user_follows integer,
    user_follower integer
);


ALTER TABLE user_follower__user_follows OWNER TO postgres;

--
-- Name: user_follower__user_follows_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_follower__user_follows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_follower__user_follows_id_seq OWNER TO postgres;

--
-- Name: user_follower__user_follows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_follower__user_follows_id_seq OWNED BY user_follower__user_follows.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "group" ALTER COLUMN id SET DEFAULT nextval('group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY group_posts__post_groups ALTER COLUMN id SET DEFAULT nextval('group_posts__post_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY group_users__user_groups ALTER COLUMN id SET DEFAULT nextval('group_users__user_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme ALTER COLUMN id SET DEFAULT nextval('theme_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme_posts__post_themes ALTER COLUMN id SET DEFAULT nextval('theme_posts__post_themes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post ALTER COLUMN id SET DEFAULT nextval('post_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_reacted__user_reactions ALTER COLUMN id SET DEFAULT nextval('post_reacted__user_reactions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_shared__user_shared ALTER COLUMN id SET DEFAULT nextval('post_shared__user_shared_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_follower__user_follows ALTER COLUMN id SET DEFAULT nextval('user_follower__user_follows_id_seq'::regclass);


--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "group" (name, bio, owner, id, "createdAt", "updatedAt") FROM stdin;
TvGlobo	Grupo da Globo	7	2	2016-06-20 19:07:08-03	2016-06-20 19:11:02-03
Futebol	Grupo para marcar peladas	5	3	2016-06-20 19:11:52-03	2016-06-20 19:12:13-03
TurmaDaVila	Grupo da turma de alunos da vila	8	1	2016-06-20 18:56:49-03	2016-06-20 19:14:50-03
\.


--
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('group_id_seq', 3, true);


--
-- Data for Name: group_posts__post_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY group_posts__post_groups (id, group_posts, post_groups) FROM stdin;
3	1	22
4	1	23
5	2	26
6	1	28
\.


--
-- Name: group_posts__post_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('group_posts__post_groups_id_seq', 6, true);


--
-- Data for Name: group_users__user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY group_users__user_groups (id, group_users, user_groups) FROM stdin;
11	1	1
12	1	3
13	1	8
14	1	10
15	1	9
17	1	2
18	1	5
19	2	7
20	2	6
21	3	5
22	3	3
23	3	7
24	3	9
25	3	10
\.


--
-- Name: group_users__user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('group_users__user_groups_id_seq', 25, true);


--
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY theme (theme, id, "createdAt", "updatedAt") FROM stdin;
foda	2	2016-06-15 23:50:15-03	2016-06-15 23:50:15-03
provaweb	3	2016-06-15 23:53:38-03	2016-06-15 23:54:30-03
ajuda	4	2016-06-20 19:02:39-03	2016-06-20 19:02:39-03
prova	1	2016-06-15 23:49:47-03	2016-06-20 19:04:06-03
QuemSabeFazAoVivo	5	2016-06-20 19:08:20-03	2016-06-20 19:08:20-03
Ixquenta	6	2016-06-20 19:11:02-03	2016-06-20 19:11:02-03
Pagode	7	2016-06-20 19:11:02-03	2016-06-20 19:11:02-03
Gentalha	8	2016-06-20 19:13:31-03	2016-06-20 19:13:31-03
papi	9	2016-06-20 19:14:50-03	2016-06-20 19:14:50-03
\.


--
-- Name: theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('theme_id_seq', 9, true);


--
-- Data for Name: theme_posts__post_themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY theme_posts__post_themes (id, theme_posts, post_themes) FROM stdin;
7	1	22
8	4	22
9	1	23
10	5	25
11	6	26
12	7	26
13	8	27
14	9	28
\.


--
-- Name: theme_posts__post_themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('theme_posts__post_themes_id_seq', 14, true);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY post (tittle, text, "user", id, "createdAt", "updatedAt") FROM stdin;
c	Olá, @turma2016! A pedido do @joao, segue o vídeo da aula de hoje: $v:"/app/media/aula-hoje.ogg". O conteúdo é tranquilo... $i:"http://upload.wikimedia.org/wikipedia/commons/b/b7/Big_smile.png". Também foi indicado refletir sobre a frase do dia em $l:"http://www.lerolero.com/". Abraço! #aula #prova	1	1	2016-06-15 22:58:25-03	2016-06-15 22:58:25-03
v	Olá, @turma2016! A pedido do @joao, segue o vídeo da aula de hoje: $v:"/app/media/aula-hoje.ogg". O conteúdo é tranquilo... $i:"http://upload.wikimedia.org/wikipedia/commons/b/b7/Big_smile.png". Também foi indicado refletir sobre a frase do dia em $l:"http://www.lerolero.com/". Abraço! #aula #prova	1	2	2016-06-15 23:00:11-03	2016-06-15 23:00:11-03
teste 2	ok agora vai	1	21	2016-06-16 21:02:19-03	2016-06-16 21:02:19-03
Duvidas da prova	E ae @TurmaDaVila estou com algumas duvidas na prova de amanhã, vcs me ajudam ? #prova #ajuda	3	22	2016-06-20 19:02:39-03	2016-06-20 19:02:39-03
Prova de amanhã	@TurmaDaVila amanhã teremos nossa ultima prova, espero que tenham estudado bastante e boa sorte. #prova	8	23	2016-06-20 19:04:05-03	2016-06-20 19:04:05-03
Pensamento	Prefiro morrer do que perder a vida	9	24	2016-06-20 19:05:56-03	2016-06-20 19:05:56-03
Programçao de domingo	@Regina qual será sua programação amanhã ??\n#QuemSabeFazAoVivo	7	25	2016-06-20 19:08:20-03	2016-06-20 19:08:20-03
Programação de domingo	@Faustao nesse domingo teremos pagode na laje do @Rafael, durante o pagode será servido uma farofa e maionese, todo a @TvGlobo estará presente. #Ixquenta #Pagode	6	26	2016-06-20 19:11:02-03	2016-06-20 19:11:02-03
Cala-se, cala-se	Caaale-se, Caaale-se vc me deixa louco @Chaves... #Gentalha	10	27	2016-06-20 19:13:30-03	2016-06-20 19:13:31-03
Bom dia querido professor	Bom dia querido professor @Girafares, minha mãe mandou está linda maçã para você. @TurmaDaVila #papi	10	28	2016-06-20 19:14:50-03	2016-06-20 19:14:50-03
\.


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('post_id_seq', 28, true);


--
-- Data for Name: post_reacted__user_reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY post_reacted__user_reactions (id, post_reacted, user_reactions) FROM stdin;
\.


--
-- Name: post_reacted__user_reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('post_reacted__user_reactions_id_seq', 1, false);


--
-- Data for Name: post_shared__user_shared; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY post_shared__user_shared (id, post_shared, user_shared) FROM stdin;
7	25	6
8	26	7
9	26	2
\.


--
-- Name: post_shared__user_shared_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('post_shared__user_shared_id_seq', 9, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "user" (name, email, password, birthday, bio, photo, id, "createdAt", "updatedAt") FROM stdin;
julia	julia@usp.br	julia	18/09/1990	profe	\N	4	2016-06-10 00:16:18-03	2016-06-10 00:16:18-03
Chaves	chaves@gmail.com	chaves	17/08/1975	Menino da vila que mora em um barril	perfil9.jpg	9	2016-06-20 18:53:49-03	2016-06-20 18:53:49-03
Kiko	kiko@gmail.com	kiko	08/11/1982	Menino da buchecha grande amigo do menino que mora no barril	perfil10.jpg	10	2016-06-20 18:55:30-03	2016-06-20 18:55:30-03
Girafales	girafares@gmail.com	girafares	28/07/1980	Professor	perfil8.jpg	8	2016-06-20 18:51:45-03	2016-06-20 19:00:09-03
Henrique	henrique@usp.br	henrique	19/09/1990	Estudante de BCC no ICMC	perfil3.jpg	3	\N	2016-06-20 19:01:15-03
Faustao	faustao@gmail.com	faustao	15/04/1977	Apresentador	perfil7.jpg	7	2016-06-20 18:49:55-03	2016-06-20 19:11:02-03
Rafael	rafael@usp.br	rafael	04/03/1991	Estudante de BCC no ICMC	perfil2.jpg	2	\N	2016-06-20 19:11:02-03
Regina	regina@gmail.com	regina	19/07/1987	Apresentadora	perfil6.jpg	6	\N	2016-06-20 19:11:20-03
Neymar	neymar@gmail.com	neymar	18/12/1992	Jogador de bola	perfil5.jpg	5	2016-06-20 18:43:39-03	2016-06-20 19:12:30-03
\.


--
-- Data for Name: user_follower__user_follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_follower__user_follows (id, user_follows, user_follower) FROM stdin;
1	1	2
4	1	3
5	3	1
6	5	8
7	3	8
8	2	3
9	5	3
10	9	3
11	10	3
12	7	6
13	3	5
14	9	5
15	10	5
\.


--
-- Name: user_follower__user_follows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_follower__user_follows_id_seq', 15, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_id_seq', 10, true);


--
-- Name: group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);


--
-- Name: group_posts__post_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY group_posts__post_groups
    ADD CONSTRAINT group_posts__post_groups_pkey PRIMARY KEY (id);


--
-- Name: group_users__user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY group_users__user_groups
    ADD CONSTRAINT group_users__user_groups_pkey PRIMARY KEY (id);


--
-- Name: theme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (id);


--
-- Name: theme_posts__post_themes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme_posts__post_themes
    ADD CONSTRAINT theme_posts__post_themes_pkey PRIMARY KEY (id);


--
-- Name: post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: post_reacted__user_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_reacted__user_reactions
    ADD CONSTRAINT post_reacted__user_reactions_pkey PRIMARY KEY (id);


--
-- Name: post_shared__user_shared_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_shared__user_shared
    ADD CONSTRAINT post_shared__user_shared_pkey PRIMARY KEY (id);


--
-- Name: user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user_follower__user_follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_follower__user_follows
    ADD CONSTRAINT user_follower__user_follows_pkey PRIMARY KEY (id);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

