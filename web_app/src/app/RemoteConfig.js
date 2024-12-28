import firebase from 'firebase/app';
import 'firebase/remote-config';

export const RemoteConfig= {
  config: undefined,
  initialize: () => {
    RemoteConfig.config= firebase.remoteConfig();
    RemoteConfig.config.settings = {
      minimumFetchIntervalMillis: 60000,
    };
    RemoteConfig.defaultConfig = ({
      'analytics_disabled_events': '',
    });
    RemoteConfig.config.fetchAndActivate()
        .catch((err) => {
          console.error(err);
        });
  },
  getString: (key) => {
    return RemoteConfig.config.getString(key)
  }
};
