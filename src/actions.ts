// function validateAction(action) {
//   switch (true) {
//     case typeof action() !== 'object':
//     case Object.keys(action()).indexOf('type') >= 0:
//       console.log('invalid action', action);
//   }
// }

class Rat {
  actions: Object;
  constructor() {
    this.actions = {};
  }
  add(name: string, action: Object | Function) {
    // default action type
    if (typeof action === 'undefined') {
      action = { type: name };
    }
    // action = validateAction(action);
    // add actions & types if not already existing
    if (this.actions[name]) {
      console.log(`Warning: key "${name}" already exists on "actions".`);
    } else {
      this.actions[name] = action;
    }
  }
  types(): string[] {
    return Object.keys(this.actions).sort();
  }
}
const rat = new Rat();
export default rat;
