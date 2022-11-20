import 'package:flutter/material.dart';
import 'package:academic/models/alumno.dart';
import 'package:overlay_support/overlay_support.dart';

import '../../models/aula.dart';

typedef OnSubmit = void Function(Alumno alumno);

class StudentEditor extends StatefulWidget {
  final Alumno alumno;
  final bool edit;
  final OnSubmit onSubmit;

  const StudentEditor({
    super.key,
    required this.alumno,
    required this.edit,
    required this.onSubmit,
  });

  @override
  State<StudentEditor> createState() => _StudentEditorState();
}

class _StudentEditorState extends State<StudentEditor> {
  late Future<List<Aula>> futureAulas;
  late List<Aula> aulas;

  @override
  void initState() {
    super.initState();
    futureAulas = Aula.fetchAulas();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
          '${widget.alumno.nombres} ${widget.alumno.apellidoPaterno} ${widget.alumno.apellidoMaterno}'),
      content: Column(
        children: [
          widget.alumno.activo
              ? ElevatedButton(
                  onPressed: () {
                    if (widget.edit) {
                      setState(() {
                        widget.alumno.activo = !widget.alumno.activo;
                      });
                    }
                  },
                  child: const Text("Activo"))
              : ElevatedButton(
                  onPressed: () {
                    if (widget.edit) {
                      setState(() {
                        widget.alumno.activo = !widget.alumno.activo;
                      });
                    }
                  },
                  child: const Text("Inactivo")),
          TextFormField(
            initialValue: widget.alumno.nombres,
            enabled: widget.edit,
            decoration: const InputDecoration(label: Text("Nombre")),
            onChanged: (value) => setState(() {
              widget.alumno.nombres = value;
            }),
          ),
          TextFormField(
            initialValue: widget.alumno.apellidoPaterno,
            enabled: widget.edit,
            decoration: const InputDecoration(label: Text("Apellido Paterno")),
            onChanged: (value) => setState(() {
              widget.alumno.apellidoPaterno = value;
            }),
          ),
          TextFormField(
            initialValue: widget.alumno.apellidoMaterno,
            enabled: widget.edit,
            decoration: const InputDecoration(label: Text("Apellido Materno")),
            onChanged: (value) => setState(() {
              widget.alumno.apellidoMaterno = value;
            }),
          ),
          TextFormField(
            initialValue: widget.alumno.curp,
            enabled: widget.edit,
            decoration: const InputDecoration(label: Text("CURP")),
            onChanged: (value) => setState(() {
              widget.alumno.curp = value;
            }),
          ),
          FutureBuilder<List<Aula>>(
            future: futureAulas,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                aulas = snapshot.data!;
                return widget.edit
                    ? DropdownButton(
                        isExpanded: true,
                        value: widget.alumno.aula.toString(),
                        items: aulas
                            .map((aula) => DropdownMenuItem<String>(
                                  value: aula.idAula.toString(),
                                  child: Text(aula.nombre),
                                ))
                            .toList(),
                        onChanged: (value) {
                          setState(() {
                            widget.alumno.aula = int.parse(value.toString());
                          });
                        })
                    : TextFormField(
                        initialValue: aulas[widget.alumno.aula].nombre,
                        decoration: const InputDecoration(label: Text("Aula")),
                        enabled: false,
                      );
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
      actions: widget.edit
          ? [
              ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                    widget.onSubmit.call(widget.alumno);
                  },
                  child: const Text("Guardar"))
            ]
          : [],
    );
  }
}
