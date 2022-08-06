import 'package:academic/models/alumno.dart';
import 'package:flutter/material.dart';

class Alumnos extends StatefulWidget {
  const Alumnos({Key? key}) : super(key: key);

  @override
  State<Alumnos> createState() => _AlumnosState();
}

class _AlumnosState extends State<Alumnos> {
  late Future<List<Alumno>> futureAlumnos;

  @override
  void initState() {
    super.initState();
    futureAlumnos = Alumno.fetchAlumnos();
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: FutureBuilder<List<Alumno>>(
        future: futureAlumnos,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            var alumnos = snapshot.data!;
            return alumnos.isNotEmpty
                ? ListView.builder(
                    itemCount: alumnos.length,
                    itemBuilder: (context, index) {
                      var alumno = alumnos[index];
                      return ListTile(
                        title: Card(
                          child: Row(children: [
                            Text(
                                '${alumno.nombres} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}'),
                            Text(alumno.curp),
                          ]),
                        ),
                      );
                    },
                  )
                : const Center(child: Text('No items'));
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          }
          return const CircularProgressIndicator();
        },
      ),
    );
  }
}
