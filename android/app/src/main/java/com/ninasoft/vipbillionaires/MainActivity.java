package com.ninasoft.vipbillionaires;

import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.firebase.dynamiclinks.PendingDynamicLinkData;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
      FirebaseDynamicLinks.getInstance().getDynamicLink(getIntent()).addOnSuccessListener(
              new OnSuccessListener<PendingDynamicLinkData>() {
                  @Override
                  public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
                      Uri deepLink = null;
                      if (pendingDynamicLinkData != null) {
                          deepLink = pendingDynamicLinkData.getLink();
                      }

                  }
              }
      ).addOnFailureListener(new OnFailureListener() {
          @Override
          public void onFailure(@NonNull Exception e) {
          }
      });

  }


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "VipBillionaires";
  }
}
