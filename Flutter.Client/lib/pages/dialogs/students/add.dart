import 'package:academic/models/alumno.dart';
import 'package:academic/models/aula.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

typedef OnSubmit = void Function(Alumno alumno);

class AddStudent extends StatefulWidget {
  const AddStudent({super.key, required this.onSubmit});

  final OnSubmit onSubmit;

  @override
  State<AddStudent> createState() => _AddStudentState();
}

class _AddStudentState extends State<AddStudent> {
  late Future<List<Aula>> futureAulas;
  late List<Aula> aulas;
  late Alumno alumno;

  @override
  void initState() {
    super.initState();
    futureAulas = Aula.fetchAulas();
    alumno = Alumno(0, "", "", "", "", 1, true);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
        title: const Text("Nuevo alumno"),
        content: Column(
          children: [
            alumno.activo
                ? ElevatedButton(
                    onPressed: () {
                      setState(() {
                        alumno.activo = !alumno.activo;
                      });
                    },
                    child: const Text("Activo"))
                : ElevatedButton(
                    onPressed: () {
                      setState(() {
                        alumno.activo = !alumno.activo;
                      });
                    },
                    child: const Text("Inactivo")),
            TextFormField(
              initialValue: alumno.nombres,
              enabled: true,
              decoration: const InputDecoration(label: Text("Nombre")),
              onChanged: (value) => setState(() {
                alumno.nombres = value;
              }),
            ),
            TextFormField(
              initialValue: alumno.apellidoPaterno,
              enabled: true,
              decoration:
                  const InputDecoration(label: Text("Apellido Paterno")),
              onChanged: (value) => setState(() {
                alumno.apellidoPaterno = value;
              }),
            ),
            TextFormField(
              initialValue: alumno.apellidoMaterno,
              enabled: true,
              decoration:
                  const InputDecoration(label: Text("Apellido Materno")),
              onChanged: (value) => setState(() {
                alumno.apellidoMaterno = value;
              }),
            ),
            TextFormField(
              initialValue: alumno.curp,
              enabled: true,
              decoration: const InputDecoration(label: Text("CURP")),
              onChanged: (value) => setState(() {
                alumno.curp = value;
              }),
            ),
            FutureBuilder<List<Aula>>(
              future: futureAulas,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  aulas = snapshot.data!;
                  return DropdownButton(
                      isExpanded: true,
                      value: alumno.aula.toString(),
                      hint: const Text("Seleccione un aula"),
                      items: aulas
                          .map((aula) => DropdownMenuItem<String>(
                                value: aula.idAula.toString(),
                                child: Text(aula.nombre),
                              ))
                          .toList(),
                      onChanged: (value) {
                        setState(() {
                          alumno.aula = int.parse(value.toString());
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
                widget.onSubmit.call(alumno);
              },
              child: const Text("Guardar"))
        ]);
  }
}
