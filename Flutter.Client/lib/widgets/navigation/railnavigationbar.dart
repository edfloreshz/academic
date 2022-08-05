import 'package:academic/data.dart';
import 'package:academic/providers/navigation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class DesktopSidebar extends StatelessWidget {
  const DesktopSidebar({
    Key? key,
    required this.selectedItem,
    required this.ref,
  }) : super(key: key);

  final NavBarItem selectedItem;
  final WidgetRef ref;

  @override
  Widget build(BuildContext context) {
    return NavigationRail(
      onDestinationSelected: (index) => {
        ref
            .read(navigationProvider.notifier)
            .update((state) => state = NavBarItem.values.elementAt(index))
      },
      destinations: const [
        NavigationRailDestination(
          icon: Icon(Icons.school),
          label: Text("Alumnos"),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.work),
          label: Text("Docentes"),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.list),
          label: Text("Asistencia"),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.class_),
          label: Text("Aulas"),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.monetization_on),
          label: Text("Pagos"),
        ),
        NavigationRailDestination(
          icon: Icon(Icons.download),
          label: Text("Constancias"),
        )
      ],
      selectedIndex: selectedItem.index,
      labelType: NavigationRailLabelType.all,
      selectedIconTheme: const IconThemeData(color: primaryContrastColor),
      unselectedIconTheme: const IconThemeData(color: secondaryColor),
      selectedLabelTextStyle: const TextStyle(color: primaryColor),
      unselectedLabelTextStyle: const TextStyle(color: secondaryColor),
      useIndicator: true,
      indicatorColor: primaryColor,
    );
  }
}
