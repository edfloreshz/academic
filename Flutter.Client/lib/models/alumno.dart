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
  int aula;
  bool activo;

  Alumno(this.idAlumno, this.nombres, this.apellidoPaterno,
      this.apellidoMaterno, this.curp, this.aula, this.activo);

  factory Alumno.fromJson(Map<String, dynamic> json) {
    return Alumno(json['idAlumno'], json['nombres'], json['apellidoPaterno'],
        json['apellidoMaterno'], json['curp'], json['aula'], json['activo']);
  }

  Map<String, dynamic> toJson() => {
        'idAlumno': idAlumno.toString(),
        'nombres': nombres,
        'apellidoPaterno': apellidoPaterno,
        'apellidoMaterno': apellidoMaterno,
        'curp': curp,
        'aula': aula.toString(),
        'activo': activo.toString(),
      };

  static Future<List<Alumno>> fetchAlumnos() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('https://localhost:5000/api/alumno'),
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

  static Future createAlumno(Alumno alumno) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.post(
      Uri.parse('https://localhost:5000/api/alumno'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(alumno.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception('No fue posible actualizar al alumno.');
    }
  }

  static Future updateAlumno(Alumno alumno) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.put(
      Uri.parse('https://localhost:5000/api/alumno/${alumno.idAlumno}'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(alumno.toJson()),
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al alumno.');
    }
  }

  static Future deleteAlumno(int id) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.delete(
      Uri.parse('https://localhost:5000/api/alumno/$id'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al alumno.');
    }
  }
}
