import 'package:academic/models/alumno.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

import '../data/alumnos_data_source.dart';

class Alumnos extends StatefulWidget {
  const Alumnos({Key? key}) : super(key: key);

  @override
  State<Alumnos> createState() => _AlumnosState();
}

class _AlumnosState extends State<Alumnos> {
  late Future<List<Alumno>> futureAlumnos;
  late List<Alumno> alumnos;

  @override
  void initState() {
    super.initState();
    futureAlumnos = Alumno.fetchAlumnos();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Alumno>>(
      future: futureAlumnos,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          alumnos = snapshot.data!;
          return alumnos.isNotEmpty
              ? Padding(
                  padding: const EdgeInsets.all(10),
                  child: SingleChildScrollView(
                    child: PaginatedDataTable(
                      source: AlumnosDataSource(alumnos),
                      header: const Center(child: Text("Alumnos")),
                      sortColumnIndex: 2,
                      rowsPerPage: 10,
                      actions: [
                        ElevatedButton(
                            onPressed: () => {}, child: const Icon(Icons.add))
                      ],
                      columns: const <DataColumn>[
                        DataColumn(label: Text("ID"), numeric: true),
                        DataColumn(label: Text("Nombre")),
                        DataColumn(label: Text("Apellido Paterno")),
                        DataColumn(label: Text("Apellido Materno")),
                        DataColumn(label: Text("CURP")),
                        DataColumn(label: Text("Activo"))
                      ],
                    ),
                  ),
                )
              : const Center(child: Text('No items'));
        } else if (snapshot.hasError) {
          showSimpleNotification(
            Text(snapshot.error.toString()),
            background: Colors.orange,
            position: NotificationPosition.bottom,
          );
          return const Center(child: Text('No items'));
        }
        return const Center(child: CircularProgressIndicator());
      },
    );
  }

  void editName() {}
}
