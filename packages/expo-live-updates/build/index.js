import { Platform } from 'react-native';
import ExpoLiveUpdatesModule from './ExpoLiveUpdatesModule';
function assertAndroid(name) {
    const isAndroid = Platform.OS === 'android';
    if (!isAndroid) {
        console.error(`${name} is only available on Android`);
        return false;
    }
    if (!ExpoLiveUpdatesModule) {
        console.error(`${name} is not available: native module not found`);
        return false;
    }
    return true;
}
/**
 * @param {LiveUpdateState} state The state for the Live Update.
 * @param {LiveUpdateConfig} config Live Update config object.
 * @returns {number} The identifier of the started Live Update or undefined if creating Live Update failed.
 */
export function startLiveUpdate(state, config) {
    if (assertAndroid('startLiveUpdate')) {
        return ExpoLiveUpdatesModule?.startLiveUpdate(state, config);
    }
}
/**
 * @param {number} notificationId The identifier of the Live Update to stop.
 */
export function stopLiveUpdate(notificationId) {
    if (assertAndroid('stopLiveUpdate')) {
        return ExpoLiveUpdatesModule?.stopLiveUpdate(notificationId);
    }
}
/**
 * @param {number} notificationId The identifier of the Live Update to update.
 * @param {LiveUpdateState} state The updated state for the Live Update.
 * @param {LiveUpdateConfig} config Optional configuration for the Live Update.
 */
export function updateLiveUpdate(notificationId, state, config) {
    if (assertAndroid('updateLiveUpdate')) {
        return ExpoLiveUpdatesModule?.updateLiveUpdate(notificationId, state, config);
    }
}
/**
 * Add a listener for Firebase Cloud Messaging token changes.
 * @param {function} listener The listener function to be called when the token changes.
 * @returns {EventSubscription} The subscription object or undefined if not supported.
 */
export function addTokenChangeListener(listener) {
    if (assertAndroid('addTokenChangeListener')) {
        return ExpoLiveUpdatesModule?.addListener('onTokenChange', listener);
    }
}
/**
 * Add a listener for Live Update notification state changes.
 * @param {function} listener The listener function to be called when notification state changes.
 * @returns {EventSubscription} The subscription object or undefined if not supported.
 */
export function addNotificationStateChangeListener(listener) {
    if (assertAndroid('addNotificationStateChangeListener')) {
        return ExpoLiveUpdatesModule?.addListener('onNotificationStateChange', listener);
    }
}
//# sourceMappingURL=index.js.map