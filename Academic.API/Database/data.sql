use CreciendoJuntos;

insert into aula (idAula, nombre)
values  (1, 'Preescolar I'),
        (2, 'Preescolar II'),
        (3, 'Preescolar III'),
        (4, 'Maternal'),
        (5, 'Lactantes');

insert into conceptosDePago (idConcepto, concepto)
values  (1, 'Mensualidad'),
        (2, 'Seguro escolar'),
        (3, 'Libros'),
        (4, 'Uniformes'),
        (5, 'Inscripcion');

insert into docente (idDocente, nombres, apellidoPaterno, apellidoMaterno, email, password, activo, administrador, aulaAsignada)
values  (10, 'Angeles', 'Martinez', 'Campa', 'gely@gmail.com', 'JhbDTGxAHONvOblHoX4jMlGvP2OleEYLpkyAPT/wfio=', true, true, 1);

use CreciendoJuntosDev;

insert into aula (idAula, nombre)
values  (1, 'Preescolar I'),
        (2, 'Preescolar II'),
        (3, 'Preescolar III'),
        (4, 'Maternal'),
        (5, 'Lactantes');

insert into conceptosDePago (idConcepto, concepto)
values  (1, 'Mensualidad'),
        (2, 'Seguro escolar'),
        (3, 'Libros'),
        (4, 'Uniformes'),
        (5, 'Inscripcion');

insert into docente (idDocente, nombres, apellidoPaterno, apellidoMaterno, email, password, activo, administrador, aulaAsignada)
values  (10, 'Angeles', 'Martinez', 'Campa', 'gely@gmail.com', 'JhbDTGxAHONvOblHoX4jMlGvP2OleEYLpkyAPT/wfio=', true, true, 1);