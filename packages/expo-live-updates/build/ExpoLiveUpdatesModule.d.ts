import { NativeModule } from 'expo';
import type { EventSubscription } from 'react-native';
import type { LiveUpdateConfig, LiveUpdateState, NotificationStateChangeEvent, TokenChangeEvent } from './types';
type ExpoLiveUpdatesModuleEvents = {
    onNotificationStateChange: (event: NotificationStateChangeEvent) => void;
    onTokenChange: (event: TokenChangeEvent) => void;
};
declare class ExpoLiveUpdatesModule extends NativeModule<ExpoLiveUpdatesModuleEvents> {
    startLiveUpdate: (state: LiveUpdateState, config?: LiveUpdateConfig) => number;
    stopLiveUpdate: (notificationId: number) => void;
    updateLiveUpdate: (notificationId: number, state: LiveUpdateState, config?: LiveUpdateConfig) => void;
    addNotificationStateChangeListener: () => EventSubscription | undefined;
    addTokenChangeListener: () => EventSubscription | undefined;
}
declare const module: ExpoLiveUpdatesModule | null;
export default module;
//# sourceMappingURL=ExpoLiveUpdatesModule.d.ts.map