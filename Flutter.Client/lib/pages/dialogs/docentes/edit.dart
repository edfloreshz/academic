import 'package:flutter/material.dart';
import 'package:academic/models/docente.dart';
import 'package:overlay_support/overlay_support.dart';

import '../../../models/aula.dart';

typedef OnSubmit = void Function(Docente docente);

class TeacherEditor extends StatefulWidget {
  final Docente docente;
  final bool edit;
  final OnSubmit onSubmit;

  const TeacherEditor({
    super.key,
    required this.docente,
    required this.edit,
    required this.onSubmit,
  });

  @override
  State<TeacherEditor> createState() => _TeacherEditorState();
}

class _TeacherEditorState extends State<TeacherEditor> {
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
          '${widget.docente.nombres} ${widget.docente.apellidoPaterno} ${widget.docente.apellidoMaterno}'),
      content: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              widget.docente.activo
                  ? ElevatedButton(
                      onPressed: () {
                        setState(() {
                          widget.docente.activo = !widget.docente.activo;
                        });
                      },
                      child: const Text("Activo"))
                  : ElevatedButton(
                      onPressed: () {
                        setState(() {
                          widget.docente.activo = !widget.docente.activo;
                        });
                      },
                      child: const Text("Inactivo")),
              widget.docente.administrador
                  ? ElevatedButton(
                      onPressed: () {
                        setState(() {
                          widget.docente.administrador =
                              !widget.docente.administrador;
                        });
                      },
                      child: const Text("Administrador"))
                  : ElevatedButton(
                      onPressed: () {
                        setState(() {
                          widget.docente.administrador =
                              !widget.docente.administrador;
                        });
                      },
                      child: const Text("Docente")),
            ],
          ),
          TextFormField(
            initialValue: widget.docente.nombres,
            enabled: widget.edit,
            decoration: const InputDecoration(label: Text("Nombre")),
            onChanged: (value) => setState(() {
              widget.docente.nombres = value;
            }),
          ),
          TextFormField(
            initialValue: widget.docente.apellidoPaterno,
            enabled: widget.edit,
            decoration: const InputDecoration(label: Text("Apellido Paterno")),
            onChanged: (value) => setState(() {
              widget.docente.apellidoPaterno = value;
            }),
          ),
          TextFormField(
            initialValue: widget.docente.apellidoMaterno,
            enabled: widget.edit,
            decoration: const InputDecoration(label: Text("Apellido Materno")),
            onChanged: (value) => setState(() {
              widget.docente.apellidoMaterno = value;
            }),
          ),
          TextFormField(
            initialValue: widget.docente.email,
            enabled: true,
            decoration: const InputDecoration(label: Text("Email")),
            onChanged: (value) => setState(() {
              widget.docente.email = value;
            }),
          ),
          TextFormField(
            initialValue: widget.docente.password,
            enabled: widget.edit,
            obscureText: true,
            decoration: const InputDecoration(label: Text("Contraseña")),
            onChanged: (value) => setState(() {
              widget.docente.password = value;
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
                        value: widget.docente.aulaAsignada.toString(),
                        items: aulas
                            .map((aula) => DropdownMenuItem<String>(
                                  value: aula.idAula.toString(),
                                  child: Text(aula.nombre),
                                ))
                            .toList(),
                        onChanged: (value) {
                          setState(() {
                            widget.docente.aulaAsignada =
                                int.parse(value.toString());
                          });
                        })
                    : TextFormField(
                        initialValue: aulas[widget.docente.aulaAsignada].nombre,
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
                    widget.onSubmit.call(widget.docente);
                  },
                  child: const Text("Guardar"))
            ]
          : [],
    );
  }
}
