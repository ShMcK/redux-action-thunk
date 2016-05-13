class Rat {
  actions: Object;
  constructor() {
    this.actions = {};
  }
  add(name: string, action: Object|Function) {
    // default action type
    if (typeof action === 'undefined') {
      action = { type: name };
    }
    // add actions & types
    if (!this.actions[name]) {
      this.actions[name] = action;
    } else {
      console.log(`Warning: key "${name}" already exists on "actions".`);
    }
  }
  types(): string[] {
    return Object.keys(this.actions).sort();
  }
}
const rat = new Rat();
export default rat;
