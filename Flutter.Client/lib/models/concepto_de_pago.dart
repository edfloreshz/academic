import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ConceptoDePago {
  int idConcepto;
  String concepto;

  ConceptoDePago(this.idConcepto, this.concepto);

  factory ConceptoDePago.fromJson(Map<String, dynamic> json) {
    return ConceptoDePago(json['idConcepto'], json['concepto']);
  }

  Map<String, dynamic> toJson() => {
        'idConcepto': idConcepto.toString(),
        'concepto': concepto.toString(),
      };

  static Future<List<ConceptoDePago>> fetchConceptosDePagos() async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.get(
      Uri.parse('https://localhost:5000/api/concepto'),
      headers: {HttpHeaders.authorizationHeader: 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      return jsonResponse
          .map<ConceptoDePago>((concepto) => ConceptoDePago.fromJson(concepto))
          .toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('No se pudo obtener la lista de conceptos');
    }
  }

  static Future createConceptoDePago(ConceptoDePago concepto) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.post(
      Uri.parse('https://localhost:5000/api/concepto'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(concepto.toJson()),
    );

    if (response.statusCode != 201) {
      throw Exception('No fue posible actualizar al concepto.');
    }
  }

  static Future updateConceptoDePago(ConceptoDePago concepto) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.put(
      Uri.parse('https://localhost:5000/api/concepto/${concepto.idConcepto}'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(concepto.toJson()),
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al concepto.');
    }
  }

  static Future deleteConceptoDePago(int id) async {
    const storage = FlutterSecureStorage();
    var token = await storage.read(key: 'token');
    final response = await http.delete(
      Uri.parse('https://localhost:5000/api/concepto/$id'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 204) {
      throw Exception('No fue posible actualizar al concepto.');
    }
  }
}
