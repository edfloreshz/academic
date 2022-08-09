import 'package:academic/data.dart';
import 'package:academic/providers/navigation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class NavigationSidebar extends StatefulWidget {
  const NavigationSidebar(
      {Key? key, required this.selectedItem, required this.ref})
      : super(key: key);

  final NavBarItem selectedItem;
  final WidgetRef ref;

  @override
  State<NavigationSidebar> createState() => _NavigationSidebarState();
}

class _NavigationSidebarState extends State<NavigationSidebar> {
  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: MediaQuery.of(context).size.width > 500,
      child: NavigationRail(
        onDestinationSelected: (index) => {
          widget.ref
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
            icon: Icon(Icons.person),
            label: Text("Tutores"),
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
        selectedIndex: widget.selectedItem.index,
        selectedIconTheme: const IconThemeData(color: primaryContrastColor),
        unselectedIconTheme: const IconThemeData(color: secondaryColor),
        selectedLabelTextStyle: const TextStyle(color: primaryColor),
        unselectedLabelTextStyle: const TextStyle(color: secondaryColor),
        useIndicator: true,
        indicatorColor: primaryColor,
        labelType: MediaQuery.of(context).size.width > 700
            ? NavigationRailLabelType.none
            : NavigationRailLabelType.all,
        extended: MediaQuery.of(context).size.width > 700,
      ),
    );
  }
}
