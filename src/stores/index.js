import AppStore from './AppStore';
import SwipeStore from './SwipeStore';

export default () => ({
  appStore: new AppStore(),
  swipeStore: new SwipeStore()
});
