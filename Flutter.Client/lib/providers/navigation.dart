import 'package:academic/pages/sections/alumnos.dart';
import 'package:academic/pages/sections/asistencia.dart';
import 'package:academic/pages/sections/aulas.dart';
import 'package:academic/pages/sections/constancias.dart';
import 'package:academic/pages/sections/docentes.dart';
import 'package:academic/pages/sections/pagos.dart';
import 'package:academic/pages/sections/tutores.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

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
