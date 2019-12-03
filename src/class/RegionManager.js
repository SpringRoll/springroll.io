import { EventBus } from './EventBus';
class RegionManager {

  constructor() {
    this.data = {};
    this.activeRegion = false;
    this.activeIndex = 0;
    this.inactiveRegions = [];
  }
}

export default new RegionManager();