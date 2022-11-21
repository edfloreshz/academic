import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

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

  Map<String, dynamic> toJson() => {
        'idAsistencia': idAsistencia.toString(),
        'idAlumno': idAlumno.toString(),
        'asistio': asistio.toString(),
        'fecha': fecha.toString(),
      };

  static Future<List<Asistencia>> fetchAsistencias() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('https://localhost:5000/api/asistencia'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      return jsonResponse
          .map<Asistencia>((asistencia) => Asistencia.fromJson(asistencia))
          .toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de asistencias');
    }
  }

  static Future createAsistencia(Asistencia asistencia) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.post(
      Uri.parse('https://localhost:5000/api/asistencia'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(asistencia.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception('No fue posible actualizar al asistencia.');
    }
  }

  static Future updateAsistencia(Asistencia asistencia) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.put(
      Uri.parse(
          'https://localhost:5000/api/asistencia/${asistencia.idAsistencia}'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(asistencia.toJson()),
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al asistencia.');
    }
  }

  static Future deleteAsistencia(int id) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.delete(
      Uri.parse('https://localhost:5000/api/asistencia/$id'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al asistencia.');
    }
  }
}
