import 'package:academic/models/alumno.dart';
import 'package:flutter/material.dart';

class AlumnosDataSource extends DataTableSource {
  List<Alumno> data = List<Alumno>.empty();

  AlumnosDataSource(List<Alumno> list) {
    data = list;
  }

  @override
  DataRow? getRow(int index) {
    return DataRow(cells: [
      DataCell(Text(data[index].idAlumno.toString())),
      DataCell(
        TextFormField(
          initialValue: data[index].nombres,
          onChanged: (value) {
            data[index].nombres = value;
            Alumno.updateAlumno(data[index]);
          },
        ),
      ),
      DataCell(
        TextFormField(
          initialValue: data[index].apellidoPaterno,
          onChanged: (value) {
            data[index].apellidoPaterno = value;
            Alumno.updateAlumno(data[index]);
          },
        ),
      ),
      DataCell(
        TextFormField(
            initialValue: data[index].apellidoMaterno,
            onChanged: (value) {
              data[index].apellidoMaterno = value;
              Alumno.updateAlumno(data[index]);
            }),
      ),
      DataCell(
        TextFormField(
          initialValue: data[index].curp,
          onChanged: (value) {
            data[index].curp = value;
            Alumno.updateAlumno(data[index]);
          },
        ),
      ),
      DataCell(
        Center(
          child: Icon(data[index].activo
              ? Icons.check_circle
              : Icons.disabled_by_default),
        ),
      ),
    ]);
  }

  @override
  bool get isRowCountApproximate => false;

  @override
  int get rowCount => data.length;

  @override
  int get selectedRowCount => 0;
}
