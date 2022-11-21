import 'package:academic/models/docente.dart';
import 'package:flutter/material.dart';

typedef OnRowSelected = void Function(int index);

class DocentesDataSource extends DataTableSource {
  DocentesDataSource(
      {required List<Docente> docentes, required this.onRowSelected})
      : data = docentes;

  final List<Docente> data;
  final void Function(int index, bool edit) onRowSelected;

  @override
  DataRow? getRow(int index) {
    return DataRow(cells: [
      DataCell(Text(data[index].idDocente.toString())),
      DataCell(Text(data[index].nombres)),
      DataCell(Text(data[index].apellidoPaterno)),
      DataCell(Text(data[index].apellidoMaterno)),
      DataCell(Text(data[index].password)),
      DataCell(
        Center(
          child: Icon(data[index].activo
              ? Icons.check_circle
              : Icons.disabled_by_default),
        ),
      ),
      DataCell(
        Center(
          child: Icon(data[index].administrador
              ? Icons.admin_panel_settings_sharp
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
              )
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
