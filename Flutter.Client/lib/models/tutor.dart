class Tutor {
  int idTutor;
  String nombres;
  String apellidoPaterno;
  String apellidoMaterno;
  String email;
  String calle;
  int numero;
  String colonia;
  String localidad;
  String estado;
  String pais;
  // ignore: non_constant_identifier_names
  int CP;
  bool activo;

  Tutor(
      this.idTutor,
      this.nombres,
      this.apellidoPaterno,
      this.apellidoMaterno,
      this.email,
      this.calle,
      this.numero,
      this.colonia,
      this.localidad,
      this.estado,
      this.pais,
      this.CP,
      this.activo);

  factory Tutor.fromJson(Map<String, dynamic> json) {
    return Tutor(
      json['idTutor'],
      json['nombres'],
      json['apellidoPaterno'],
      json['apellidoMaterno'],
      json['email'],
      json['calle'],
      json['numero'],
      json['colonia'],
      json['localidad'],
      json['estado'],
      json['pais'],
      json['CP'],
      json['activo'],
    );
  }
}
