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
                ? Padding(
                    padding: const EdgeInsets.all(10),
                    child: GridView.count(
                      mainAxisSpacing: 4,
                      crossAxisSpacing: 4,
                      crossAxisCount: 4,
                      children: alumnos
                          .map(
                            (alumno) => Card(
                              child: Column(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  const Icon(
                                    Icons.school,
                                    size: 100,
                                  ),
                                  Text(
                                    '${alumno.nombres} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}',
                                  ),
                                  Text(alumno.curp),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceEvenly,
                                    children: [
                                      ElevatedButton(
                                        style: ElevatedButton.styleFrom(
                                            primary: Colors.blue),
                                        onPressed: () => {},
                                        child: const Text("Edit"),
                                      ),
                                      ElevatedButton(
                                        onPressed: () => {},
                                        child: const Text("Delete"),
                                      ),
                                    ],
                                  )
                                ],
                              ),
                            ),
                          )
                          .toList(),
                    ),
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
