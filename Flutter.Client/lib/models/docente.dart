import 'dart:convert';
import 'dart:io';
import 'package:encrypt/encrypt.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Docente {
  int idDocente;
  String nombres;
  String apellidoPaterno;
  String apellidoMaterno;
  String email;
  String password;
  bool activo;
  bool administrador;
  int aulaAsignada;
  dynamic aulaAsignadaNavigation;

  Docente(
    this.idDocente,
    this.nombres,
    this.apellidoPaterno,
    this.apellidoMaterno,
    this.email,
    this.password,
    this.activo,
    this.administrador,
    this.aulaAsignada,
  );

  factory Docente.fromJson(Map<String, dynamic> json) => Docente(
        json["idDocente"],
        json["nombres"],
        json["apellidoPaterno"],
        json["apellidoMaterno"],
        json["email"],
        json["password"],
        json["activo"],
        json["administrador"],
        json["aulaAsignada"],
      );

  Map<String, dynamic> toJson() => {
        "idDocente": idDocente.toString(),
        "nombres": nombres,
        "apellidoPaterno": apellidoPaterno,
        "apellidoMaterno": apellidoMaterno,
        "email": email,
        "password": password,
        "activo": activo.toString(),
        "administrador": administrador.toString(),
        "aulaAsignada": aulaAsignada.toString(),
      };

  static Future<List<Docente>> fetchDocentes() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    var jwtKey = await storage.read(key: 'jwt');
    final key = Key.fromUtf8(jwtKey!);
    final encrypter = Encrypter(AES(key, mode: AESMode.cbc, padding: null));

    final response = await http.get(
      Uri.parse('https://localhost:5000/api/docente'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      var jsonResponse = json.decode(response.body);
      return jsonResponse.map<Docente>(
        (docente) {
          var teacher = Docente.fromJson(docente);
          final iv = IV.fromLength(16);
          var password = Encrypted.fromBase64(teacher.password);
          var decryptedPassword = encrypter.decrypt(password, iv: iv);
          teacher.password = decryptedPassword;
          return teacher;
        },
      ).toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de docentes');
    }
  }

  static Future createDocente(Docente docente) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.post(
      Uri.parse('https://localhost:5000/api/register'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(docente.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception('No fue posible actualizar al docente.');
    }
  }

  static Future updateDocente(Docente docente) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.put(
      Uri.parse('https://localhost:5000/api/docente/${docente.idDocente}'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(docente.toJson()),
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al docente.');
    }
  }

  static Future deleteDocente(int id) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.delete(
      Uri.parse('https://localhost:5000/api/docente/$id'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al docente.');
    }
  }
}
