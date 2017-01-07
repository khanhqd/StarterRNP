package com.starterrnp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.reactnativenavigation.NavigationApplication;
import android.support.annotation.Nullable;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add the packages you require here.
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage(),
            new RNSendIntentPackage());

  };
}
