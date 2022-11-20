import 'dart:async';

import 'package:academic/models/alumno.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

import '../data/alumnos_data_source.dart';
import '../models/aula.dart';
import 'dialogs/edit_student.dart';

class Alumnos extends StatefulWidget {
  const Alumnos({Key? key}) : super(key: key);

  @override
  State<Alumnos> createState() => _AlumnosState();
}

class _AlumnosState extends State<Alumnos> {
  late Future<List<Alumno>> futureAlumnos;
  late Future<List<Aula>> futureAulas;
  late List<Alumno> alumnos;
  late List<Aula> aulas;

  final StreamController<List<Alumno>> _streamController =
      StreamController<List<Alumno>>();
  late Stream<List<Alumno>> stream;

  @override
  void initState() {
    super.initState();
    futureAlumnos = Alumno.fetchAlumnos();
    futureAulas = Aula.fetchAulas();
    stream = _streamController.stream;
    fetch();
  }

  void fetch() async {
    var response = await Alumno.fetchAlumnos();
    _streamController.add(response);
  }

  @override
  void dispose() {
    _streamController.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<Alumno>>(
      stream: stream,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          alumnos = snapshot.data!;
          return alumnos.isNotEmpty
              ? Padding(
                  padding: const EdgeInsets.all(10),
                  child: SingleChildScrollView(
                    child: PaginatedDataTable(
                      source: AlumnosDataSource(
                        alumnos: alumnos,
                        onRowSelected: (index, edit) {
                          showDialog(
                            context: context,
                            builder: ((context) {
                              return StudentEditor(
                                  alumno: alumnos[index],
                                  edit: edit,
                                  onSubmit: (alumno) async {
                                    await Alumno.updateAlumno(alumno);
                                    var response = await Alumno.fetchAlumnos();
                                    _streamController.add(response);
                                  });
                            }),
                          );
                        },
                      ),
                      header: const Center(child: Text("Alumnos")),
                      sortColumnIndex: 2,
                      rowsPerPage: 10,
                      actions: [
                        ElevatedButton(
                          onPressed: () => {},
                          child: const Icon(Icons.add),
                        ),
                        ElevatedButton(
                          onPressed: () async {
                            var response = await Alumno.fetchAlumnos();
                            _streamController.add(response);
                          },
                          child: const Icon(Icons.refresh),
                        )
                      ],
                      columns: const <DataColumn>[
                        DataColumn(label: Text("ID"), numeric: true),
                        DataColumn(label: Text("Nombre")),
                        DataColumn(label: Text("Apellido Paterno")),
                        DataColumn(label: Text("Apellido Materno")),
                        DataColumn(label: Text("CURP")),
                        DataColumn(label: Text("Activo")),
                        DataColumn(label: Text("Acciones"))
                      ],
                    ),
                  ),
                )
              : const Center(child: Text('No items'));
        } else if (snapshot.hasError) {
          showSimpleNotification(
            Text(snapshot.error.toString()),
            background: Colors.red,
            position: NotificationPosition.bottom,
          );
          return const Center(child: Text('No items'));
        }
        return const Center(child: CircularProgressIndicator());
      },
    );
  }
}
