import { Navigation } from 'react-native-navigation';

import SideMenu from './SideMenu';
import Home from './Home.ios.js';
import Database from './Database.ios.js';
import MyCustomer from './MyCustomer.ios.js';
import CustomerDetail from './CustomerDetail.ios.js';
import HistoryScene from './HistoryScene.ios.js';
import Checklist from './Checklist.ios.js';
import LoginForm from './LoginForm.ios.js';
import Motivation from './Motivation.js';
import Target from './Target.js';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('screen.SideMenu', () => SideMenu);
  Navigation.registerComponent('screen.LoginForm', () => LoginForm);
  Navigation.registerComponent('screen.Home', () => Home);
  Navigation.registerComponent('screen.Database', () => Database);
  Navigation.registerComponent('screen.MyCustomer', () => MyCustomer);
  Navigation.registerComponent('screen.CustomerDetail', () => CustomerDetail);
  Navigation.registerComponent('screen.HistoryScene', () => HistoryScene);
  Navigation.registerComponent('screen.Checklist', () => Checklist);
  Navigation.registerComponent('screen.Motivation', () => Motivation);
  Navigation.registerComponent('screen.Target', () => Target);
}
