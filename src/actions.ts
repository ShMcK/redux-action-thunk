class Ram {
  actions: Object;
  constructor() {
    this.actions = {};
  }
  add(name: string, action) {
    if (!this.actions[name]) {
      this.actions[name] = action;
    } else {
      console.log(`Warning: key "${name}" already exists on "actions".`);
    }
  }
}
const ram = new Ram();
export default ram;
