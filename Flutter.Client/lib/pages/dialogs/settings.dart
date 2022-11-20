import 'package:academic/providers/theme.dart';
import 'package:flex_color_picker/flex_color_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Settings extends ConsumerStatefulWidget {
  const Settings({super.key});

  @override
  ConsumerState<Settings> createState() => _SettingsState();
}

class _SettingsState extends ConsumerState<Settings> {
  @override
  void initState() {
    super.initState();
    ref.read(colorSchemeProvider);
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      child: SizedBox(
          width: 500,
          child: Card(
            child: ExpansionTile(
              initiallyExpanded: true,
              title: const Text("Apariencia"),
              children: [
                ListTile(
                  contentPadding: const EdgeInsets.all(10),
                  title: const Text("Acento"),
                  trailing: Wrap(spacing: 5, children: [
                    ColorIndicator(
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      color: Colors.blue,
                      onSelect: () => ref
                          .read(colorSchemeProvider.notifier)
                          .update((state) => state = AppColorScheme.blue),
                    ),
                    ColorIndicator(
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      color: Colors.red,
                      onSelect: () => ref
                          .read(colorSchemeProvider.notifier)
                          .update((state) => state = AppColorScheme.red),
                    ),
                    ColorIndicator(
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      color: Colors.pink,
                      onSelect: () => ref
                          .read(colorSchemeProvider.notifier)
                          .update((state) => state = AppColorScheme.pink),
                    ),
                    ColorIndicator(
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      color: Colors.yellow,
                      onSelect: () => ref
                          .read(colorSchemeProvider.notifier)
                          .update((state) => state = AppColorScheme.yellow),
                    ),
                    ColorIndicator(
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      color: Colors.green,
                      onSelect: () => ref
                          .read(colorSchemeProvider.notifier)
                          .update((state) => state = AppColorScheme.green),
                    ),
                    ColorIndicator(
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      color: Colors.purple,
                      onSelect: () => ref
                          .read(colorSchemeProvider.notifier)
                          .update((state) => state = AppColorScheme.purple),
                    ),
                  ]),
                ),
                ListTile(
                  contentPadding: const EdgeInsets.all(10),
                  title: const Text("Tema"),
                  trailing: Wrap(children: [
                    ElevatedButton(
                      onPressed: () => ref
                          .read(themeProvider.notifier)
                          .update((state) => state = Brightness.light),
                      child: const Icon(Icons.sunny),
                    ),
                    const SizedBox(width: 10),
                    ElevatedButton(
                      onPressed: () => ref
                          .read(themeProvider.notifier)
                          .update((state) => state = Brightness.dark),
                      child: const Icon(Icons.nightlight),
                    )
                  ]),
                )
              ],
            ),
          )),
    );
  }
}
