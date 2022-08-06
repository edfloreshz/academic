class Alumno {
  int idAlumno;
  String nombres;
  String apellidoPaterno;
  String apellidoMaterno;
  String curp;
  bool activo;

  Alumno(this.idAlumno, this.nombres, this.apellidoPaterno,
      this.apellidoMaterno, this.curp, this.activo);

  factory Alumno.fromJson(Map<String, dynamic> json) {
    return Alumno(json['idAlumno'], json['nombres'], json['apellidoPaterno'],
        json['apellidoMaterno'], json['curp'], json['activo']);
  }
}
