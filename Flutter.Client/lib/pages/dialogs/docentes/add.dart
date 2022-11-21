import 'package:academic/models/aula.dart';
import 'package:academic/models/docente.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

typedef OnSubmit = void Function(Docente alumno);

class AddTeacher extends StatefulWidget {
  const AddTeacher({super.key, required this.onSubmit});

  final OnSubmit onSubmit;

  @override
  State<AddTeacher> createState() => _AddTeacherState();
}

class _AddTeacherState extends State<AddTeacher> {
  late Future<List<Aula>> futureAulas;
  late List<Aula> aulas;
  late Docente docente;

  @override
  void initState() {
    super.initState();
    futureAulas = Aula.fetchAulas();
    docente = Docente(0, "", "", "", "", "", true, false, 1);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
        title: const Text("Nuevo docente"),
        content: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                docente.activo
                    ? ElevatedButton(
                        onPressed: () {
                          setState(() {
                            docente.activo = !docente.activo;
                          });
                        },
                        child: const Text("Activo"))
                    : ElevatedButton(
                        onPressed: () {
                          setState(() {
                            docente.activo = !docente.activo;
                          });
                        },
                        child: const Text("Inactivo")),
                docente.administrador
                    ? ElevatedButton(
                        onPressed: () {
                          setState(() {
                            docente.administrador = !docente.administrador;
                          });
                        },
                        child: const Text("Administrador"))
                    : ElevatedButton(
                        onPressed: () {
                          setState(() {
                            docente.administrador = !docente.administrador;
                          });
                        },
                        child: const Text("Docente")),
              ],
            ),
            TextFormField(
              initialValue: docente.nombres,
              enabled: true,
              decoration: const InputDecoration(label: Text("Nombre")),
              onChanged: (value) => setState(() {
                docente.nombres = value;
              }),
            ),
            TextFormField(
              initialValue: docente.apellidoPaterno,
              enabled: true,
              decoration:
                  const InputDecoration(label: Text("Apellido Paterno")),
              onChanged: (value) => setState(() {
                docente.apellidoPaterno = value;
              }),
            ),
            TextFormField(
              initialValue: docente.apellidoMaterno,
              enabled: true,
              decoration:
                  const InputDecoration(label: Text("Apellido Materno")),
              onChanged: (value) => setState(() {
                docente.apellidoMaterno = value;
              }),
            ),
            TextFormField(
              initialValue: docente.email,
              enabled: true,
              decoration: const InputDecoration(label: Text("Email")),
              onChanged: (value) => setState(() {
                docente.email = value;
              }),
            ),
            TextFormField(
              initialValue: docente.password,
              enabled: true,
              obscureText: true,
              decoration: const InputDecoration(label: Text("Password")),
              onChanged: (value) => setState(() {
                docente.password = value;
              }),
            ),
            FutureBuilder<List<Aula>>(
              future: futureAulas,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  aulas = snapshot.data!;
                  return DropdownButton(
                      isExpanded: true,
                      value: docente.aulaAsignada.toString(),
                      hint: const Text("Seleccione un aula"),
                      items: aulas
                          .map((aula) => DropdownMenuItem<String>(
                                value: aula.idAula.toString(),
                                child: Text(aula.nombre),
                              ))
                          .toList(),
                      onChanged: (value) {
                        setState(() {
                          docente.aulaAsignada = int.parse(value.toString());
                        });
                      });
                } else if (snapshot.hasError) {
                  showSimpleNotification(
                    Text(snapshot.error.toString()),
                    background: Colors.red,
                    position: NotificationPosition.bottom,
                  );
                  return const Center(child: Text('No items'));
                } else {
                  return const Center(child: CircularProgressIndicator());
                }
              },
            ),
          ],
        ),
        icon: const Icon(Icons.person),
        scrollable: true,
        actions: [
          ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                widget.onSubmit.call(docente);
              },
              child: const Text("Guardar"))
        ]);
  }
}
