create database if not exists academic;

create table if not exists aula
(
    idAula int auto_increment
    primary key,
    nombre varchar(255) not null
    );

create table if not exists alumno
(
    idAlumno        int auto_increment
    primary key,
    nombres         varchar(255)         not null,
    apellidoPaterno varchar(255)         not null,
    apellidoMaterno varchar(255)         not null,
    curp            varchar(18)          not null,
    aula            int                  not null,
    activo          tinyint(1) default 0 not null,
    constraint alumno_aula_fk
    foreign key (aula) references aula (idAula)
    );

create table if not exists asistencia
(
    idAsistencia int auto_increment
    primary key,
    idAlumno     int                                  not null,
    asistio      bit                                  not null,
    fecha        datetime default current_timestamp() not null,
    constraint asistencia_alumno_fk
    foreign key (idAlumno) references alumno (idAlumno)
    );

create table if not exists conceptosDePago
(
    idConcepto int auto_increment
    primary key,
    concepto   varchar(255) not null
    );

create table if not exists docente
(
    idDocente       int auto_increment
    primary key,
    nombres         varchar(255)     not null,
    apellidoPaterno varchar(255)     not null,
    apellidoMaterno varchar(255)     not null,
    email           varchar(255)     not null,
    password        longtext         null,
    activo          bit default b'0' not null,
    administrador   bit default b'0' not null,
    aulaAsignada    int              not null,
    constraint usuario_email_uindex
    unique (email),
    constraint docente_aula_idAula_fk
    foreign key (aulaAsignada) references aula (idAula)
    );

create table if not exists tutor
(
    idTutor         int auto_increment
    primary key,
    nombres         varchar(255) not null,
    apellidoPaterno varchar(255) not null,
    apellidoMaterno varchar(255) not null,
    numeroCelular   varchar(10)  not null,
    email           varchar(255) not null,
    calle           varchar(255) not null,
    numero          int          not null,
    colonia         varchar(255) not null,
    localidad       varchar(255) not null,
    estado          varchar(255) not null,
    pais            varchar(255) not null,
    CP              int          not null,
    activo          bit          not null
    );

create table if not exists alumnoTutor
(
    idAlumnoTutor int auto_increment
    primary key,
    idTutor       int not null,
    idAlumno      int not null,
    constraint alumnoTutores_alumno_fk
    foreign key (idAlumno) references alumno (idAlumno),
    constraint alumnoTutores_tutor_fk
    foreign key (idTutor) references tutor (idTutor)
    );

create table if not exists pagos
(
    idPago             int auto_increment
    primary key,
    fecha              datetime default current_timestamp() not null,
    concepto           int                                  not null,
    comprobanteDePago  longblob                             not null,
    idTutor            int                                  not null,
    idAlumno           int                                  not null,
    cantidad           int                                  not null,
    formatoComprobante varchar(255)                         not null,
    constraint pagos_alumno_idAlumno_fk
    foreign key (idAlumno) references alumno (idAlumno),
    constraint pagos_conceptosDePago_idConcepto_fk
    foreign key (concepto) references conceptosDePago (idConcepto),
    constraint pagos_tutor_fk
    foreign key (idTutor) references tutor (idTutor)
    );

insert into creciendojuntos.aula (idAula, nombre)
values  (1, 'Preescolar I'),
        (2, 'Preescolar II'),
        (3, 'Preescolar III'),
        (4, 'Maternal'),
        (5, 'Lactantes');

insert into creciendojuntos.conceptosDePago (idConcepto, concepto)
values  (1, 'Mensualidad'),
        (2, 'Seguro escolar'),
        (3, 'Libros'),
        (4, 'Uniformes'),
        (5, 'Inscripcion');

insert into creciendojuntos.docente (idDocente, nombres, apellidoPaterno, apellidoMaterno, email, password, activo, administrador, aulaAsignada)
values  (10, 'Angeles', 'Martinez', 'Campa', 'gely@gmail.com', 'JhbDTGxAHONvOblHoX4jMlGvP2OleEYLpkyAPT/wfio=', true, true, 1);