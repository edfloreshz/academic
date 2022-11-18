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
      DataCell(Text(
          "${data[index].nombres} ${data[index].apellidoPaterno} ${data[index].apellidoMaterno}")),
      DataCell(Text(data[index].curp)),
    ]);
  }

  @override
  bool get isRowCountApproximate => false;

  @override
  int get rowCount => data.length;

  @override
  int get selectedRowCount => 0;
}
