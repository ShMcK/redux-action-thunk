class Rat {
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
const rat = new Rat();
export default rat;
