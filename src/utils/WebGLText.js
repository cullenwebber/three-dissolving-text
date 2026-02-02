import { Text } from "troika-three-text";

export default class WebGLText {
	constructor(string = "", options = {}) {
		this.string = string;
		this.options = options;
		this.text = null;
		this.font = `${import.meta.env.BASE_URL}mango.ttf`;
		this.#init();

		return this.text;
	}

	#init() {
		this.#createText();
	}

	#createText() {
		this.text = new Text();
		this.text.text = this.string;
		this.text.font = this.font;
		this.text.fontSize = 3.0;
		this.text.anchorX = "center";
		this.text.anchorY = "baseline";
		this.text.lineHeight = 0.75;
		this.text.color = 0xffffff;
		this.text.sync();
	}
}
