"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
const EXPO_MODULE_SCHEME_KEY = 'expo.modules.scheme';
const CHANNEL_ID_KEY = 'expo.modules.liveupdates.channelId';
const CHANNEL_NAME_KEY = 'expo.modules.liveupdates.channelName';
const SERVICE_NAME = 'expo.modules.liveupdates.FirebaseService';
const RECEIVER_NAME = 'expo.modules.liveupdates.NotificationDismissedReceiver';
const LOG_PREFIX = 'ExpoLiveUpdatesModule:';
let warnedMissingScheme = false;
const isFirebaseConfigured = (config) => {
    return !!config.android?.googleServicesFile;
};
const log = (message) => console.log(`${LOG_PREFIX} ${message}`);
const checkConfigProperty = (property, propertyName) => {
    if (!property)
        throw new Error(LOG_PREFIX +
            `${propertyName} is required. Please provide ${propertyName} in plugin configuration.`);
};
const ensureService = (config, androidManifest) => {
    if (!isFirebaseConfigured(config)) {
        log('Firebase not configured - skipping Firebase service registration');
        return;
    }
    const mainApplication = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
    const existingServices = (mainApplication.service ??= []);
    const existingServiceIndex = existingServices.findIndex((svc) => svc?.$?.['android:name'] === SERVICE_NAME);
    const baseService = {
        '$': {
            'android:name': SERVICE_NAME,
            'android:exported': 'false',
        },
        'intent-filter': [
            {
                action: [
                    {
                        $: {
                            'android:name': 'com.google.firebase.MESSAGING_EVENT',
                        },
                    },
                ],
            },
        ],
    };
    if (existingServiceIndex >= 0) {
        existingServices[existingServiceIndex] = baseService;
    }
    else {
        existingServices.push(baseService);
    }
};
const ensureReceiver = (androidManifest) => {
    const mainApplication = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
    const existingReceivers = (mainApplication.receiver ??= []);
    const existingReceiverIndex = existingReceivers.findIndex((rcv) => rcv?.$?.['android:name'] === RECEIVER_NAME);
    const baseReceiver = {
        $: {
            'android:name': RECEIVER_NAME,
            'android:exported': 'false',
            'android:enabled': 'true',
        },
    };
    if (existingReceiverIndex >= 0) {
        existingReceivers[existingReceiverIndex] = baseReceiver;
    }
    else {
        existingReceivers.push(baseReceiver);
    }
};
const withLiveUpdates = (config, props) => {
    const { channelId, channelName } = props;
    checkConfigProperty(channelId, 'channelId');
    checkConfigProperty(channelName, 'channelName');
    const scheme = Array.isArray(config.scheme) ? config.scheme[0] : config.scheme;
    return (0, config_plugins_1.withAndroidManifest)(config, configWithManifest => {
        const mainApplication = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow(configWithManifest.modResults);
        // Add app scheme metadata
        if (scheme) {
            config_plugins_1.AndroidConfig.Manifest.addMetaDataItemToMainApplication(mainApplication, EXPO_MODULE_SCHEME_KEY, scheme);
        }
        else if (!warnedMissingScheme) {
            log('scheme is not configured, deeplinks will not work');
            warnedMissingScheme = true;
        }
        // Add channel configuration metadata
        config_plugins_1.AndroidConfig.Manifest.addMetaDataItemToMainApplication(mainApplication, CHANNEL_ID_KEY, channelId);
        config_plugins_1.AndroidConfig.Manifest.addMetaDataItemToMainApplication(mainApplication, CHANNEL_NAME_KEY, channelName);
        // Ensure Firebase service is configured
        ensureService(config, configWithManifest.modResults);
        // Ensure notification dismissed receiver is configured
        ensureReceiver(configWithManifest.modResults);
        return configWithManifest;
    });
};
exports.default = withLiveUpdates;
