import { type ConfigPlugin } from 'expo/config-plugins';
export interface LiveUpdatesPluginProps {
    channelId: string;
    channelName: string;
}
declare const withLiveUpdates: ConfigPlugin<LiveUpdatesPluginProps>;
export default withLiveUpdates;
