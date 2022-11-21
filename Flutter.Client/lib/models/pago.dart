import 'dart:html';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Pago {
  int idPago;
  DateTime fecha;
  int concepto;
  Blob comprobanteDePago;
  int idTutor;
  int idAlumno;
  int cantidad;
  String formatoComprobante;

  Pago(
    this.idPago,
    this.fecha,
    this.concepto,
    this.comprobanteDePago,
    this.idTutor,
    this.idAlumno,
    this.cantidad,
    this.formatoComprobante,
  );

  factory Pago.fromJson(Map<String, dynamic> json) {
    return Pago(
      json['idPago'],
      json['fecha'],
      json['concepto'],
      json['comprobanteDePago'],
      json['idTutor'],
      json['idAlumno'],
      json['cantidad'],
      json['formatoComprobante'],
    );
  }

  Map<String, dynamic> toJson() => {
        'idPago': idPago.toString(),
        'fecha': fecha.toString(),
        'concepto': concepto.toString(),
        'comprobanteDePago': comprobanteDePago.toString(),
        'idTutor': idTutor.toString(),
        'idAlumno': idAlumno.toString(),
        'cantidad': cantidad.toString(),
        'formatoComprobante': formatoComprobante,
      };

  static Future<List<Pago>> fetchPagos() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('https://localhost:5000/api/pago'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      return jsonResponse.map<Pago>((pago) => Pago.fromJson(pago)).toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de pagos');
    }
  }

  static Future createPago(Pago pago) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.post(
      Uri.parse('https://localhost:5000/api/pago'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(pago.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception('No fue posible actualizar al pago.');
    }
  }

  static Future updatePago(Pago pago) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.put(
      Uri.parse('https://localhost:5000/api/pago/${pago.idPago}'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(pago.toJson()),
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al pago.');
    }
  }

  static Future deletePago(int id) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.delete(
      Uri.parse('https://localhost:5000/api/pago/$id'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al pago.');
    }
  }
}
