import 'dart:convert';

import 'package:academic/data.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:overlay_support/overlay_support.dart';

class Login extends StatefulWidget {
  final Function() notifyLogin;
  const Login({Key? key, required this.notifyLogin}) : super(key: key);

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _storage = const FlutterSecureStorage();
  TextEditingController nameController =
      TextEditingController(text: "gely@gmail.com");
  TextEditingController passwordController =
      TextEditingController(text: "Gely0102");
  @override
  Widget build(BuildContext context) {
    final loginView = ListView(
      children: <Widget>[
        Container(
          alignment: Alignment.center,
          padding: const EdgeInsets.all(10),
          child: const Text(
            'Inicio de sesión',
          ),
        ),
        Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(10),
            child: const Text(
              'Ingrese su correo y contraseña',
              style: TextStyle(fontSize: 20),
            )),
        Container(
          padding: const EdgeInsets.all(10),
          child: TextField(
            controller: nameController,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Correo electronico',
            ),
          ),
        ),
        Container(
          padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
          child: TextField(
            obscureText: true,
            controller: passwordController,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Contraseña',
            ),
          ),
        ),
        Container(
          padding: const EdgeInsets.all(10),
          child: TextButton(
            onPressed: () {
              //forgot password screen
            },
            child: const Text(
              'Olvide mi contraseña',
            ),
          ),
        ),
        Container(
            height: 50,
            padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
            child: ElevatedButton(
              child: const Text('Iniciar Sesión'),
              onPressed: () async {
                final response = await http.post(
                  Uri.parse("http://localhost:4000/api/authenticate"),
                  headers: <String, String>{
                    'Content-Type': 'application/json; charset=UTF-8',
                  },
                  body: jsonEncode(<String, String>{
                    'email': nameController.text,
                    'password': passwordController.text,
                  }),
                );
                if (response.statusCode == 200) {
                  var body = jsonDecode(response.body);
                  await _storage.write(key: 'token', value: body['token']);
                  widget.notifyLogin();
                } else {
                  showSimpleNotification(
                    Text(response.reasonPhrase.toString()),
                    background: Colors.orange,
                    position: NotificationPosition.bottom,
                  );
                  throw Exception(response.body);
                }
              },
            )),
      ],
    );

    return MediaQuery.of(context).size.width > 700
        ? Center(
            child: SizedBox(
              width: 400,
              child: loginView,
            ),
          )
        : Padding(padding: const EdgeInsets.all(10), child: loginView);
  }
}
