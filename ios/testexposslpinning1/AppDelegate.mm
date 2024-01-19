#import "AppDelegate.h"
#import <Firebase/Firebase.h>
#import <GoogleMaps/GoogleMaps.h>
#import <RNBranch/RNBranch.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

// #import <Firebase.h>

#import "BrazeReactUtils.h"
#import "BrazeReactBridge.h"
// #import "BrazeReactDelegate.h"

#import <BrazeKit/BrazeKit-Swift.h>
#import <BrazeLocation/BrazeLocation-Swift.h>

@implementation AppDelegate

@synthesize bridge;

static NSDictionary *const googleMapsConfig = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GoogleMaps"];
// static NSString *const googleMapsApiKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GoogleMapsApiKey"];

static Braze *_brazeInstance;

static NSDictionary *const brazeConfig = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"Braze"];
// static NSString *const brazeEndpoint = [brazeConfig valueForKeyPath:@"Endpoint"];
// static NSString *const brazeApiKey = [brazeConfig valueForKeyPath:@"ApiKey"];

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"main";

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  NSLog(@"AppDelegate.didFinishLaunchingWithOptions: %@", launchOptions);

  // Uncomment this line to use the test key instead of the live one.
  // [RNBranch useTestInstance];
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];

  [AppDelegate initGoogleMaps];

  [FIRApp configure];

  [AppDelegate initBraze:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Linking API
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [super application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}

// Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  BOOL result = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  return [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  return [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  return [super application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

+ (void) initGoogleMaps {
  [GMSServices provideAPIKey:[googleMapsConfig valueForKeyPath:@"ApiKey"]];
}

+ (Braze *)braze {
  return _brazeInstance;
}

+ (void) initBraze:(NSDictionary *)launchOptions {
  NSLog(@"AppDelegate.initBraze: brazeConfig: %@", brazeConfig);

  NSString *brazeEndpoint = [brazeConfig valueForKeyPath:@"Endpoint"];
  NSString *brazeApiKey = [brazeConfig valueForKeyPath:@"ApiKey"];

  BRZConfiguration *brazeConfigImpl = [[BRZConfiguration alloc] initWithApiKey:brazeApiKey endpoint:brazeEndpoint];
  brazeConfigImpl.triggerMinimumTimeInterval = 1;
  brazeConfigImpl.logger.level = BRZLoggerLevelDebug; // [brazeConfig valueForKeyPath:@"LogLevel"]; // 
  brazeConfigImpl.location.brazeLocationProvider = [[BrazeLocationProvider alloc] init];
  brazeConfigImpl.location.automaticLocationCollection = [brazeConfig valueForKeyPath:@"EnableAutomaticLocationCollection"]; // YES;
  brazeConfigImpl.location.geofencesEnabled = [brazeConfig valueForKeyPath:@"EnableGeofence"]; // YES;
  // brazeConfigImpl.location.automaticGeofenceRequests = YES;
  Braze *braze = [BrazeReactBridge initBraze:brazeConfigImpl];
  // braze.delegate = [[BrazeReactDelegate alloc] init];
  _brazeInstance = braze;
  // [self registerForPushNotifications];
  [[BrazeReactUtils sharedInstance] populateInitialUrlFromLaunchOptions:launchOptions];
}

@end
