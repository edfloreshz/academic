class Asistencia {
  int idAsistencia;
  int idAlumno;
  bool asistio;
  DateTime fecha;

  Asistencia(this.idAsistencia, this.idAlumno, this.asistio, this.fecha);

  factory Asistencia.fromJson(Map<String, dynamic> json) {
    return Asistencia(
        json['idAsistencia'], json['idAlumno'], json['asistio'], json['fecha']);
  }
}
