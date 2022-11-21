import 'dart:async';

import 'package:academic/data/docentes_data_source.dart';
import 'package:academic/models/docente.dart';
import 'package:academic/models/aula.dart';
import 'package:academic/pages/dialogs/docentes/add.dart';
import 'package:academic/pages/dialogs/docentes/edit.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

class Docentes extends StatefulWidget {
  const Docentes({Key? key}) : super(key: key);

  @override
  State<Docentes> createState() => _DocentesState();
}

class _DocentesState extends State<Docentes> {
  late Future<List<Docente>> futureDocentes;
  late Future<List<Aula>> futureAulas;
  late List<Docente> docentes;
  late List<Aula> aulas;

  final StreamController<List<Docente>> _streamController =
      StreamController<List<Docente>>();
  late Stream<List<Docente>> stream;

  @override
  void initState() {
    super.initState();
    futureDocentes = Docente.fetchDocentes();
    futureAulas = Aula.fetchAulas();
    stream = _streamController.stream;
    fetch();
  }

  void fetch() async {
    var response = await Docente.fetchDocentes();
    _streamController.add(response);
  }

  @override
  void dispose() {
    _streamController.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<Docente>>(
      stream: stream,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          docentes = snapshot.data!;
          return Padding(
            padding: const EdgeInsets.all(10),
            child: SingleChildScrollView(
              child: PaginatedDataTable(
                actions: [
                  NewStudentButton(streamController: _streamController),
                  RefreshStudentButton(streamController: _streamController)
                ],
                source: DocentesDataSource(
                  docentes: docentes,
                  onRowSelected: (index, edit) {
                    showDialog(
                      context: context,
                      builder: ((context) {
                        return TeacherEditor(
                          docente: docentes[index],
                          edit: edit,
                          onSubmit: updateTeacher,
                        );
                      }),
                    );
                  },
                ),
                header: const Center(child: Text("Docentes")),
                rowsPerPage: docentes.length > 10 ? 10 : docentes.length,
                columns: const <DataColumn>[
                  DataColumn(label: Text("ID"), numeric: true),
                  DataColumn(label: Text("Nombre")),
                  DataColumn(label: Text("Apellido Paterno")),
                  DataColumn(label: Text("Apellido Materno")),
                  DataColumn(label: Text("Contraseña")),
                  DataColumn(label: Text("Activo")),
                  DataColumn(label: Text("Administrador")),
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

  void updateTeacher(teacher) async {
    await Docente.updateDocente(teacher);
    var response = await Docente.fetchDocentes();
    _streamController.add(response);
  }
}

class RefreshStudentButton extends StatelessWidget {
  const RefreshStudentButton({
    Key? key,
    required StreamController<List<Docente>> streamController,
  })  : _streamController = streamController,
        super(key: key);

  final StreamController<List<Docente>> _streamController;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        var response = await Docente.fetchDocentes();
        _streamController.add(response);
      },
      child: const Icon(Icons.refresh),
    );
  }
}

class NewStudentButton extends StatelessWidget {
  const NewStudentButton({
    Key? key,
    required StreamController<List<Docente>> streamController,
  })  : _streamController = streamController,
        super(key: key);

  final StreamController<List<Docente>> _streamController;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => {
        showDialog(
          context: context,
          builder: ((context) {
            return AddTeacher(
              onSubmit: (docente) async {
                await Docente.createDocente(docente);
                var response = await Docente.fetchDocentes();
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
