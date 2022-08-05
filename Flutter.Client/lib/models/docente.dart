class Docente {
  int idDocente;
  String nombres;
  String apellidoPaterno;
  String apellidoMaterno;
  String password;
  bool activo;
  bool administrador;
  int aulaAsignada;

  Docente(
      this.idDocente,
      this.nombres,
      this.apellidoPaterno,
      this.apellidoMaterno,
      this.password,
      this.activo,
      this.administrador,
      this.aulaAsignada);

  factory Docente.fromJson(Map<String, dynamic> json) {
    return Docente(
        json['idDocente'],
        json['nombres'],
        json['apellidoPaterno'],
        json['apellidoMaterno'],
        json['password'],
        json['activo'],
        json['administrador'],
        json['aulaAsignada']);
  }
}
