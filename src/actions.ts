class Rat {
  actions: Object;
  types: Object;
  constructor() {
    this.actions = {};
  }
  add(name: string, action) {
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
  getTypes(): string[] {
    return Object.keys(this.actions);
  }
  getActions(): Object {
    return this.actions;
  }
}
const rat = new Rat();
export default rat;
