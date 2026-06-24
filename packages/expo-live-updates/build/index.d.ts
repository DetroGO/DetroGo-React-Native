import type { EventSubscription } from 'expo-modules-core';
import type { LiveUpdateConfig, LiveUpdateState, NotificationStateChangeEvent, TokenChangeEvent } from './types';
type Voidable<T> = T | void;
/**
 * @param {LiveUpdateState} state The state for the Live Update.
 * @param {LiveUpdateConfig} config Live Update config object.
 * @returns {number} The identifier of the started Live Update or undefined if creating Live Update failed.
 */
export declare function startLiveUpdate(state: LiveUpdateState, config?: LiveUpdateConfig): Voidable<number>;
/**
 * @param {number} notificationId The identifier of the Live Update to stop.
 */
export declare function stopLiveUpdate(notificationId: number): void;
/**
 * @param {number} notificationId The identifier of the Live Update to update.
 * @param {LiveUpdateState} state The updated state for the Live Update.
 * @param {LiveUpdateConfig} config Optional configuration for the Live Update.
 */
export declare function updateLiveUpdate(notificationId: number, state: LiveUpdateState, config?: LiveUpdateConfig): void;
/**
 * Add a listener for Firebase Cloud Messaging token changes.
 * @param {function} listener The listener function to be called when the token changes.
 * @returns {EventSubscription} The subscription object or undefined if not supported.
 */
export declare function addTokenChangeListener(listener: (event: TokenChangeEvent) => void): Voidable<EventSubscription>;
/**
 * Add a listener for Live Update notification state changes.
 * @param {function} listener The listener function to be called when notification state changes.
 * @returns {EventSubscription} The subscription object or undefined if not supported.
 */
export declare function addNotificationStateChangeListener(listener: (event: NotificationStateChangeEvent) => void): Voidable<EventSubscription>;
export {};
//# sourceMappingURL=index.d.ts.map