import React, { useEffect, useRef } from 'react';
import { Platform, View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import * as Haptics from 'expo-haptics';
import mobileAds, { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import html from './gameHtml';

// Yayından önce kendi AdMob reklam birimi kimliklerinle değiştir:
const UNIT = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
      ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/IOS_UNIT_ID',
      android: 'ca-app-pub-XXXXXXXXXXXXXXXX/ANDROID_UNIT_ID',
    });

const ad = InterstitialAd.createForAdRequest(UNIT);

export default function App() {
  const loaded = useRef(false);

  useEffect(() => {
    mobileAds().initialize();
    const u1 = ad.addAdEventListener(AdEventType.LOADED, () => (loaded.current = true));
    const u2 = ad.addAdEventListener(AdEventType.CLOSED, () => {
      loaded.current = false;
      ad.load();
    });
    const u3 = ad.addAdEventListener(AdEventType.ERROR, () => {
      loaded.current = false;
      setTimeout(() => ad.load(), 30000);
    });
    ad.load();
    return () => { u1(); u2(); u3(); };
  }, []);

  const onMessage = (e) => {
    let m;
    try { m = JSON.parse(e.nativeEvent.data); } catch { return; }
    if (m.t === 'vib') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (m.t === 'ad' && loaded.current) ad.show();
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#07060f' }}>
        <View style={{ flex: 1 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html, baseUrl: 'https://localhost' }}
            onMessage={onMessage}
            javaScriptEnabled
            domStorageEnabled
            bounces={false}
            overScrollMode="never"
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            style={{ flex: 1, backgroundColor: '#07060f' }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
