import { Navigation } from 'react-native-navigation';

import SideMenu from './SideMenu';
import Home from './Home';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('test.SideMenu', () => SideMenu);
  Navigation.registerComponent('test.Home', () => Home);
}
