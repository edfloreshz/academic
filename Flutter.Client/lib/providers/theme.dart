import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum AppColorScheme { blue, red, pink, yellow, green, purple }

final colorSchemeProvider =
    StateProvider<AppColorScheme>((ref) => AppColorScheme.green);

final themeProvider = StateProvider<Brightness>((ref) => Brightness.light);

final colorsProvider = StateProvider<List<Color>>(
  (ref) => [
    Colors.blue,
    Colors.red,
    Colors.pink,
    Colors.yellow,
    Colors.green,
    Colors.purple,
  ],
);

final colorNamesProvider = StateProvider<List<String>>(
  (ref) => [
    "blue",
    "red",
    "pink",
    "yellow",
    "green",
    "purple",
  ],
);
