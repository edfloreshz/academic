import 'package:academic/providers/navigation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MobileBottomBar extends StatelessWidget {
  const MobileBottomBar({
    Key? key,
    required this.selectedItem,
    required this.ref,
    required this.isLoggedIn,
  }) : super(key: key);

  final NavBarItem selectedItem;
  final WidgetRef ref;
  final bool isLoggedIn;

  @override
  Widget build(BuildContext context) {
    var isMobile = MediaQuery.of(context).size.width < 500;

    return Visibility(
      visible: isLoggedIn && isMobile,
      child: NavigationBar(
        onDestinationSelected: (index) => {
          ref
              .read(navigationProvider.notifier)
              .update((state) => state = NavBarItem.values.elementAt(index))
        },
        selectedIndex: selectedItem.index,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.school), label: "Alumnos"),
          NavigationDestination(icon: Icon(Icons.work), label: "Docentes"),
          NavigationDestination(icon: Icon(Icons.list), label: "Asistencia"),
          NavigationDestination(icon: Icon(Icons.class_), label: "Aulas"),
          NavigationDestination(
              icon: Icon(Icons.monetization_on), label: "Pagos"),
          NavigationDestination(
              icon: Icon(Icons.download), label: "Constancias"),
        ],
      ),
    );
  }
}
