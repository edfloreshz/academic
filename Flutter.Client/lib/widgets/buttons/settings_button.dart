import 'package:academic/pages/dialogs/settings.dart';
import 'package:flutter/material.dart';

class SettingsButton extends StatelessWidget {
  const SettingsButton({
    Key? key,
    required this.isLoggedIn,
  }) : super(key: key);

  final bool isLoggedIn;

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: isLoggedIn,
      child: TextButton(
        child: const Icon(Icons.settings),
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return const Settings();
            },
          );
        },
      ),
    );
  }
}
