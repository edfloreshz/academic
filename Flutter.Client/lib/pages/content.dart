import 'package:academic/providers/navigation.dart';
import 'package:academic/widgets/navigation/navigation_sidebar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Content extends StatelessWidget {
  const Content({
    Key? key,
    required this.selectedItem,
    required this.ref,
    required this.pages,
  }) : super(key: key);

  final NavBarItem selectedItem;
  final WidgetRef ref;
  final List<Widget> pages;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        LayoutBuilder(builder: (context, constraint) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraint.maxHeight),
              child: IntrinsicHeight(
                child: NavigationSidebar(selectedItem: selectedItem, ref: ref),
              ),
            ),
          );
        }),
        // const VerticalDivider(thickness: 1, width: 1),
        Expanded(
          child: pages[selectedItem.index],
        )
      ],
    );
  }
}
