import 'package:academic/models/alumno.dart';
import 'package:flutter/material.dart';

typedef OnRowSelected = void Function(int index);

class AlumnosDataSource extends DataTableSource {
  AlumnosDataSource(
      {required List<Alumno> alumnos, required this.onRowSelected})
      : data = alumnos;

  final List<Alumno> data;
  final void Function(int index, bool edit) onRowSelected;
  @override
  DataRow? getRow(int index) {
    return DataRow(cells: [
      DataCell(Text(data[index].idAlumno.toString())),
      DataCell(Text(data[index].nombres)),
      DataCell(Text(data[index].apellidoPaterno)),
      DataCell(Text(data[index].apellidoMaterno)),
      DataCell(Text(data[index].curp)),
      DataCell(
        Center(
          child: Icon(data[index].activo
              ? Icons.check_circle
              : Icons.disabled_by_default),
        ),
      ),
      DataCell(
        Center(
          child: Row(
            children: [
              ElevatedButton(
                child: const Icon(Icons.info),
                onPressed: () => onRowSelected(index, false),
              ),
              ElevatedButton(
                child: const Icon(Icons.edit),
                onPressed: () => onRowSelected(index, true),
              ),
              ElevatedButton(
                child: const Icon(Icons.delete),
                onPressed: () {},
              ),
            ],
          ),
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
