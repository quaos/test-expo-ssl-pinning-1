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

## Refs

* [react-native-ssl-public-key-pinning](https://github.com/frw/react-native-ssl-public-key-pinning)
* [react-native-firebase](https://rnfirebase.io/)
