import 'dart:convert';
import 'dart:io';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

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

  static Future<List<Alumno>> fetchAlumnos() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('http://localhost:4000/api/alumno'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      return jsonResponse
          .map<Alumno>((alumno) => Alumno.fromJson(alumno))
          .toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de alumnos');
    }
  }
}
