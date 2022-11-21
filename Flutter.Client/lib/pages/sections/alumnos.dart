import 'dart:async';

import 'package:academic/data/alumnos_data_source.dart';
import 'package:academic/models/alumno.dart';
import 'package:academic/models/aula.dart';
import 'package:academic/pages/dialogs/students/add.dart';
import 'package:academic/pages/dialogs/students/edit.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

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
          return Padding(
            padding: const EdgeInsets.all(10),
            child: SingleChildScrollView(
              child: PaginatedDataTable(
                actions: [
                  NewStudentButton(streamController: _streamController),
                  RefreshStudentButton(streamController: _streamController)
                ],
                source: AlumnosDataSource(
                  alumnos: alumnos,
                  onRowSelected: (index, edit) {
                    showDialog(
                      context: context,
                      builder: ((context) {
                        return StudentEditor(
                          alumno: alumnos[index],
                          edit: edit,
                          onSubmit: updateStudent,
                        );
                      }),
                    );
                  },
                ),
                header: const Center(child: Text("Alumnos")),
                rowsPerPage: alumnos.length > 10 ? 10 : alumnos.length,
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
          );
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

  void updateStudent(alumno) async {
    await Alumno.updateAlumno(alumno);
    var response = await Alumno.fetchAlumnos();
    _streamController.add(response);
  }
}

class RefreshStudentButton extends StatelessWidget {
  const RefreshStudentButton({
    Key? key,
    required StreamController<List<Alumno>> streamController,
  })  : _streamController = streamController,
        super(key: key);

  final StreamController<List<Alumno>> _streamController;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        var response = await Alumno.fetchAlumnos();
        _streamController.add(response);
      },
      child: const Icon(Icons.refresh),
    );
  }
}

class NewStudentButton extends StatelessWidget {
  const NewStudentButton({
    Key? key,
    required StreamController<List<Alumno>> streamController,
  })  : _streamController = streamController,
        super(key: key);

  final StreamController<List<Alumno>> _streamController;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => {
        showDialog(
          context: context,
          builder: ((context) {
            return AddStudent(
              onSubmit: (alumno) async {
                await Alumno.createAlumno(alumno);
                var response = await Alumno.fetchAlumnos();
                _streamController.add(response);
              },
            );
          }),
        )
      },
      child: const Icon(Icons.add),
    );
  }
}
