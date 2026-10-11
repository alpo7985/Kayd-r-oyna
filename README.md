# Kaydır Oyna – Expo uygulaması

## Kurulum
```bash
npx create-expo-app@latest kaydir-oyna --template blank
cd kaydir-oyna
npx expo install react-native-webview expo-haptics react-native-safe-area-context react-native-google-mobile-ads
```
Bu klasördeki `App.js`, `app.json` ve `gameHtml.js` dosyalarını proje köküne kopyala (üzerine yaz).

## Çalıştırma (AdMob Expo Go'da çalışmaz, geliştirme build'i gerekir)
```bash
npx expo prebuild
npx expo run:ios      # veya run:android
```

## Mağazaya hazırlık
1. `app.json` içinde `bundleIdentifier` ve `package` değerlerini kendi adınla değiştir.
2. admob.google.com'da uygulamanı ve "Interstitial" reklam birimini oluştur. Test kimliklerini (`app.json` ve `App.js`) kendi kimliklerinle değiştir.
3. `npm i -g eas-cli && eas build -p all` ile derle, `eas submit` ile gönder.
4. Gizlilik politikası ve reklam bildirimi (ATT / Data Safety) gerekli.

## Notlar
- Oyunlar `gameHtml.js` içinde. Oyunu değiştirirsen aynı dosyayı yeniden üret.
- Reklam, akıştaki "Reklam" ekranı görününce gösterilir (her 4 oyunda bir).
- Canlı skor tablosu ve topluluk oyunları için bir sunucu gerekir (Supabase önerilir). Şu an skorlar sadece cihazda saklanır.
