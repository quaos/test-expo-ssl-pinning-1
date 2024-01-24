package com.quaos.testexposslpinning1;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import expo.modules.ReactActivityDelegateWrapper;

import io.branch.rnbranch.RNBranchModule;
// import io.branch.indexing.BranchUniversalObject;
// import io.branch.referral.Branch;
// import io.branch.referral.BranchError;
// import io.branch.referral.util.LinkProperties;

import org.json.JSONObject;

public class MainActivity extends ReactActivity {
  private static MainActivity currentInstance;

  public MainActivity () {
    super();
    currentInstance = this;
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Log.d(BuildConfig.APPLICATION_ID + "." + MainActivity.class.getSimpleName(),
      "onCreate: " + (savedInstanceState != null ? savedInstanceState.toString() : null));
    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null);
  }

	@Override
	protected void onStart() {
		super.onStart();

    Log.d(BuildConfig.APPLICATION_ID + "." + MainActivity.class.getSimpleName(), "onStart");

    RNBranchModule.initSession(getIntent().getData(), this);
		// Branch.sessionBuilder(this)
    //   .withCallback(new Branch.BranchUniversalReferralInitListener() {
    //     @Override
    //     public void onInitFinished(BranchUniversalObject branchUniversalObject, LinkProperties linkProperties, BranchError error) {
    //       if (error != null) {
    //         Log.e("BranchSDK_Tester", "branch init failed. Caused by -" + error.getMessage());
    //       } else {
    //         Log.i("BranchSDK_Tester", "branch init complete!");
    //         if (branchUniversalObject != null) {
    //           Log.i("BranchSDK_Tester", "title " + branchUniversalObject.getTitle());
    //           Log.i("BranchSDK_Tester", "CanonicalIdentifier " + branchUniversalObject.getCanonicalIdentifier());
    //           Log.i("BranchSDK_Tester", "metadata " + branchUniversalObject.getContentMetadata().convertToJson());
    //         }

    //         if (linkProperties != null) {
    //           Log.i("BranchSDK_Tester", "Channel " + linkProperties.getChannel());
    //           Log.i("BranchSDK_Tester", "control params " + linkProperties.getControlParams());
    //         }
    //       }
    //     }
    //   })
    //   .withData(this.getIntent().getData()).init();
	}

  @Override
  public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      RNBranchModule.onNewIntent(intent);
      setIntent(intent);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()));
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }
}
