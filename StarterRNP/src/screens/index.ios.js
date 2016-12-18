import {Navigation} from 'react-native-navigation';

import SideMenu from './SideMenu';
import Home from './Home';
import Checklist from './Checklist';
import CustomerDetail from './CustomerDetail';
import Database from './Database';
import History from './History';
import Motivation from './Motivation';
import MyCustomer from './MyCustomer';
import Target from './Target';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('test.SideMenu', () => SideMenu);
  Navigation.registerComponent('test.Home', () => Home);
  Navigation.registerComponent('test.Checklist', () => Checklist);
  Navigation.registerComponent('test.CustomerDetail', () => CustomerDetail);
  Navigation.registerComponent('test.Database', () => Database);
  Navigation.registerComponent('test.History', () => History);
  Navigation.registerComponent('test.Motivation', () => Motivation);
  Navigation.registerComponent('test.MyCustomer', () => MyCustomer);
  Navigation.registerComponent('test.Target', () => Target);

}
