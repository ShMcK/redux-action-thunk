class Ram {
	constructor() {
		this.actions = {};
	}
	add(name, action) {
		if (!this.actions[name]) {
			this.actions[name] = action;
		} else {
			console.log(`Warning: key "${name}" already exists on "actions".`);
		}
	}
}
const ram = new Ram();
export default ram;
