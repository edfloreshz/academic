import 'package:academic/data.dart';
import 'package:academic/pages/login.dart';
import 'package:academic/providers/navigation.dart';
import 'package:academic/widgets/navigation/navigationbar.dart';
import 'package:academic/widgets/navigation/railnavigationbar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

void main() async {
  if (isMobile) {
    FlutterNativeSplash.remove();
  }
  runApp(const ProviderScope(child: Academic()));
}

class Academic extends ConsumerWidget {
  const Academic({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: appName,
      theme: ThemeData(
        primarySwatch: primaryColor,
        secondaryHeaderColor: secondaryColor,
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

  @override
  Widget build(BuildContext context) {
    final selectedItem = ref.watch(navigationProvider);
    final pages = ref.watch(pagesProvider);

    var isMobile = MediaQuery.of(context).size.width < 500;

    return Scaffold(
      appBar: AppBar(
        title: const Text(appName),
        actions: [
          ElevatedButton(
            onPressed: () async => {
              setState(() {
                isLoggedIn = false;
                _storage.deleteAll();
              })
            },
            child: const Text("Salir"),
          )
        ],
      ),
      body: isMobile
          ? isLoggedIn
              ? pages[selectedItem.index]
              : Login(notifyLogin: notifyLogin)
          : isLoggedIn
              ? Row(
                  children: [
                    DesktopSidebar(selectedItem: selectedItem, ref: ref),
                    const VerticalDivider(thickness: 1, width: 1),
                    pages[selectedItem.index]
                  ],
                )
              : Login(notifyLogin: notifyLogin),
      bottomNavigationBar: MobileBottomBar(
          selectedItem: selectedItem, ref: ref, isLoggedIn: isLoggedIn),
    );
  }
}
