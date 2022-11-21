import 'package:academic/data.dart';
import 'package:academic/pages/content.dart';
import 'package:academic/pages/login.dart';
import 'package:academic/providers/navigation.dart';
import 'package:academic/providers/theme.dart';
import 'package:academic/widgets/buttons/logout_button.dart';
import 'package:academic/widgets/buttons/settings_button.dart';
import 'package:academic/widgets/navigation/navigation_bottom_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:overlay_support/overlay_support.dart';

void main() async {
  if (isMobile) {
    FlutterNativeSplash.remove();
  }
  runApp(const ProviderScope(child: OverlaySupport.global(child: Academic())));
}

class Academic extends ConsumerWidget {
  const Academic({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedColorScheme = ref.watch(colorSchemeProvider);
    final selectedTheme = ref.watch(themeProvider);
    final colors = ref.watch(colorsProvider);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: appName,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: colors[selectedColorScheme.index],
          brightness: selectedTheme,
        ),
      ),
      home: const Main(),
    );
  }
}

class Main extends ConsumerStatefulWidget {
  const Main({Key? key}) : super(key: key);

  @override
  ConsumerState<Main> createState() => _MainState();
}

class _MainState extends ConsumerState<Main> {
  final _storage = const FlutterSecureStorage();
  var isLoggedIn = false;

  @override
  void initState() {
    super.initState();
    ref.read(navigationProvider);
  }

  notifyLogin() {
    setState(() {
      isLoggedIn = true;
    });
  }

  void logout() => {
        setState(
          () {
            isLoggedIn = false;
            _storage.deleteAll();
          },
        )
      };

  @override
  Widget build(BuildContext context) {
    final selectedItem = ref.watch(navigationProvider);
    final pages = ref.watch(pagesProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text(appName)),
        actions: [
          SettingsButton(isLoggedIn: isLoggedIn),
          LogoutButton(
            isLoggedIn: isLoggedIn,
            storage: _storage,
            onPressed: logout,
          ),
        ],
      ),
      body: !isLoggedIn
          ? Login(notifyLogin: notifyLogin)
          : Content(selectedItem: selectedItem, ref: ref, pages: pages),
      bottomNavigationBar: NavigationBottomBar(
          selectedItem: selectedItem, ref: ref, isLoggedIn: isLoggedIn),
    );
  }
}
