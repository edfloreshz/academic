import 'package:academic/pages/asistencia.dart';
import 'package:academic/pages/aulas.dart';
import 'package:academic/pages/constancias.dart';
import 'package:academic/pages/docentes.dart';
import 'package:academic/pages/pagos.dart';
import 'package:academic/pages/tutores.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:academic/pages/alumnos.dart';

enum NavBarItem {
  alumnos,
  tutores,
  docentes,
  asistencia,
  aulas,
  pagos,
  constancias
}

final navigationProvider =
    StateProvider<NavBarItem>((ref) => NavBarItem.alumnos);

final pagesProvider = StateProvider<List<Widget>>(
  (ref) => [
    const Alumnos(),
    const Docentes(),
    const Asistencia(),
    const Tutores(),
    const Aulas(),
    const Pagos(),
    const Constancias(),
  ],
);
