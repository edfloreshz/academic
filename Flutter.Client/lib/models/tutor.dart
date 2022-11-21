import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

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

  Map<String, dynamic> toJson() => {
        'idTutor': idTutor.toString(),
        'nombres': nombres,
        'apellidoPaterno': apellidoPaterno,
        'apellidoMaterno': apellidoMaterno,
        'email': email,
        'calle': activo.toString(),
        'numero': numero.toString(),
        'colonia': colonia.toString(),
        'localidad': localidad.toString(),
        'estado': estado.toString(),
        'pais': pais.toString(),
        'CP': CP.toString(),
        'activo': activo.toString(),
      };

  static Future<List<Tutor>> fetchTutores() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('https://localhost:5000/api/tutor'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      return jsonResponse.map<Tutor>((tutor) => Tutor.fromJson(tutor)).toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de tutors');
    }
  }

  static Future createTutor(Tutor tutor) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.post(
      Uri.parse('https://localhost:5000/api/tutor'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(tutor.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception('No fue posible actualizar al tutor.');
    }
  }

  static Future updateTutor(Tutor tutor) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.put(
      Uri.parse('https://localhost:5000/api/tutor/${tutor.idTutor}'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(tutor.toJson()),
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al tutor.');
    }
  }

  static Future deleteTutor(int id) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.delete(
      Uri.parse('https://localhost:5000/api/tutor/$id'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al tutor.');
    }
  }
}
