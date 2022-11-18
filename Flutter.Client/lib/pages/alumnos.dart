import 'package:academic/models/alumno.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';
import 'package:flutter/src/widgets/framework.dart';

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
                      header: const Center(child: Text("Alumnos")),
                      rowsPerPage: 10,
                      source: AlumnosDataSource(alumnos),
                      sortAscending: true,
                      sortColumnIndex: 1,
                      columns: const <DataColumn>[
                        DataColumn(
                            numeric: true,
                            label: Expanded(
                              child: Text("ID"),
                            )),
                        DataColumn(
                            label: Expanded(
                          child: Text("Nombre"),
                        )),
                        DataColumn(
                            label: Expanded(
                          child: Text("CURP"),
                        ))
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
