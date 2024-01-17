# test-expo-ssl-pinning-1

Expo App that's supposed to test & reproduce SSL Pinning issues, esp. in iOS

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

## Braze SDK

* Configuration is in file: `app.json` in section: `plugins` -> `@braze/expo-plugin`
* After modifying the config above, the native config files need to be re-generated:

```shell
npx expo prebuild
```

## Refs

* [react-native-ssl-public-key-pinning](https://github.com/frw/react-native-ssl-public-key-pinning)
* [react-native-firebase](https://rnfirebase.io/)
* [Braze - React Native - Initial SDK Setup](https://www.braze.com/docs/developer_guide/platform_integration_guides/react_native/react_sdk_setup/)
