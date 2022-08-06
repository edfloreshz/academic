class Aula {
  int idAula;
  String nombre;

  Aula(this.idAula, this.nombre);

  factory Aula.fromJson(Map<String, dynamic> json) {
    return Aula(json['idAula'], json['nombre']);
  }
}
