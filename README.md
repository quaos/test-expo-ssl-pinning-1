# test-expo-ssl-pinning-1

Expo App that's supposed to test & reproduce SSL Pinning issues, esp. in iOS

## Current Test Results

* ✅ Base App (Expo 49 + RN 0.72 + RN SSL Pinning 1.1.3 + TrustKit 3.0.3)
* ✅ Firebase (RN Firebase App 18.7.3 + Analytics 18.7.3 + Remote Config 18.7.3)
* ✅ Braze (Braze RN SDK 8.3.0 + Braze Expo Plugin 1.2.0)
* ✅ Branch (RN Branch SDK 5.6.2 + Branch SDK for iOS 1.43.2 + Branch SDK for Android 5.2.5)
* ✅ Sentry (Sentry Expo 7.1.1)
* ✅ Google Maps (RN Maps 1.7.1 + Google Maps SDK for iOS 7.4.0 + GMS Google Services for Android 4.4.0)
* ❌ Expo Dev Client (expo-dev-client 2.4.12)
* ✅ Expo Dev Client (expo-dev-client 2.2.1) on iOS
* ❌ Expo Dev Client (expo-dev-client 2.2.1) on Android

## Preparing

```shell
# after pulling the repo
yarn

# iOS
cd ios && pod install
```

## Running

```shell
# iOS - with correct pinning keys
yarn ios

# iOS - with INCORRECT pinning keys
yarn ios:incorrect

# Android - with correct pinning keys
yarn android

# Android - with INCORRECT pinning keys
yarn android:incorrect
```

## Expo Dev Client

* Currently there are incompatibilities with Android - the app crashes on start with this error:
```
java.lang.RuntimeException: Unable to start activity ComponentInfo{com.quaos.testexposslpinning1/expo.modules.devmenu.DevMenuActivity}: kotlin.UninitializedPropertyAccessException: lateinit property rootView has not been initialized
  android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3645)
  android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3782)
  ...
Caused by kotlin.UninitializedPropertyAccessException: lateinit property rootView has not been initialized
  expo.modules.devmenu.DevMenuActivity$createReactActivityDelegate$1.loadApp(DevMenuActivity.kt:45)
  com.facebook.react.ReactActivityDelegate.onCreate(ReactActivityDelegate.java:109)
  com.facebook.react.ReactActivity.onCreate(ReactActivity.java:46)
  android.app.Activity.performCreate(Activity.java:8305)
  ...
```

## Braze SDK

* Configuration is in file: `app.json` in section: `plugins` -> `@braze/expo-plugin`
* After modifying the config above, the native config files need to be re-generated:

```shell
npx expo prebuild
```

## Google Maps

* iOS configuration is in file: `ios/testexposslpinning1/Info.plist`, section: `GoogleMaps`
* Android configuration is in file: `android/app/src/main/AndroidManifest.xml`, keys: `com.google.android.geo.*`

## Refs

* [react-native-ssl-public-key-pinning](https://github.com/frw/react-native-ssl-public-key-pinning)
* [react-native-firebase](https://rnfirebase.io/)
* [Braze - React Native - Initial SDK Setup](https://www.braze.com/docs/developer_guide/platform_integration_guides/react_native/react_sdk_setup/)
* [Branch.io - React Native](https://help.branch.io/developers-hub/docs/react-native)
* [Branch.io - Native SDKs Overview](https://help.branch.io/developers-hub/docs/native-sdks-overview)
* [Expo - Using Sentry](https://docs.expo.dev/guides/using-sentry/)
* [react-native-maps](https://github.com/react-native-maps/react-native-maps)
