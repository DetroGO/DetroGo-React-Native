const { withAndroidManifest } = require('@expo/config-plugins');
const { AndroidConfig } = require('@expo/config-plugins');

const EXPO_MODULE_SCHEME_KEY = 'expo.modules.scheme';
const CHANNEL_ID_KEY = 'expo.modules.liveupdates.channelId';
const CHANNEL_NAME_KEY = 'expo.modules.liveupdates.channelName';
const RECEIVER_NAME = 'expo.modules.liveupdates.NotificationDismissedReceiver';

module.exports = function withLiveUpdates(config, props) {
  const { channelId, channelName } = props || {};

  if (!channelId) throw new Error('expo-live-updates: channelId is required');
  if (!channelName) throw new Error('expo-live-updates: channelName is required');

  const scheme = Array.isArray(config.scheme) ? config.scheme[0] : config.scheme;

  return withAndroidManifest(config, c => {
    const mainApp = AndroidConfig.Manifest.getMainApplicationOrThrow(c.modResults);

    if (scheme) {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(mainApp, EXPO_MODULE_SCHEME_KEY, scheme);
    }

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(mainApp, CHANNEL_ID_KEY, channelId);
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(mainApp, CHANNEL_NAME_KEY, channelName);

    const existingReceivers = (mainApp.receiver ??= []);
    const exists = existingReceivers.findIndex(r => r?.$?.['android:name'] === RECEIVER_NAME);
    const receiver = { $: { 'android:name': RECEIVER_NAME, 'android:exported': 'false', 'android:enabled': 'true' } };
    if (exists >= 0) existingReceivers[exists] = receiver;
    else existingReceivers.push(receiver);

    return c;
  });
};
