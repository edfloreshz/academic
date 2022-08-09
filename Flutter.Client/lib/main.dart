import 'package:academic/data.dart';
import 'package:academic/pages/login.dart';
import 'package:academic/providers/navigation.dart';
import 'package:academic/widgets/navigation/navigation_bottom_bar.dart';
import 'package:academic/widgets/navigation/navigation_sidebar.dart';
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

    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text(appName)),
        actions: [
          Visibility(
            visible: isLoggedIn,
            child: Tooltip(
              message: "Logout",
              child: ElevatedButton(
                onPressed: () async => {
                  setState(() {
                    isLoggedIn = false;
                    _storage.deleteAll();
                  })
                },
                child: const Icon(Icons.logout),
              ),
            ),
          )
        ],
      ),
      body: !isLoggedIn
          ? Login(notifyLogin: notifyLogin)
          : Row(
              children: [
                LayoutBuilder(builder: (context, constraint) {
                  return SingleChildScrollView(
                    child: ConstrainedBox(
                      constraints:
                          BoxConstraints(minHeight: constraint.maxHeight),
                      child: IntrinsicHeight(
                        child: NavigationSidebar(
                            selectedItem: selectedItem, ref: ref),
                      ),
                    ),
                  );
                }),
                const VerticalDivider(thickness: 1, width: 1),
                pages[selectedItem.index]
              ],
            ),
      bottomNavigationBar: NavigationBottomBar(
          selectedItem: selectedItem, ref: ref, isLoggedIn: isLoggedIn),
    );
  }
}
