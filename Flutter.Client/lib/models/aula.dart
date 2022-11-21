import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Aula {
  int idAula;
  String nombre;

  Aula(this.idAula, this.nombre);

  factory Aula.fromJson(Map<String, dynamic> json) {
    return Aula(json['idAula'], json['nombre']);
  }

  Map<String, dynamic> toJson() => {
        'idAula': idAula.toString(),
        'nombre': nombre,
      };

  static Future<List<Aula>> fetchAulas() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('https://localhost:5000/api/aula'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      return jsonResponse.map<Aula>((aula) => Aula.fromJson(aula)).toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de aulas');
    }
  }

  static Future<Aula> fetchAula(int id) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('https://localhost:5000/api/aula/$id'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      return Aula.fromJson(jsonResponse);
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de alumnos');
    }
  }

  static Future updateAula(Aula aula) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.put(
      Uri.parse('https://localhost:5000/api/aula/${aula.idAula}'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(aula.toJson()),
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al alumno.');
    }
  }
}
