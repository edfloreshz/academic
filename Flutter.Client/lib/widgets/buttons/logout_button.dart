import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LogoutButton extends StatelessWidget {
  const LogoutButton(
      {super.key,
      required this.isLoggedIn,
      required this.storage,
      required this.onPressed});

  final bool isLoggedIn;
  final FlutterSecureStorage storage;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: isLoggedIn,
      child: TextButton(
        child: const Icon(Icons.logout),
        onPressed: () => onPressed.call(),
      ),
    );
  }
}
