import { Text } from "troika-three-text";

export default class WebGLText {
	constructor(string = "", options = {}) {
		this.string = string;
		this.options = options;
		this.text = null;
		this.maxWidth = 2.5;
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
		this.text.fontSize = Math.min(0.004 * window.innerWidth, this.maxWidth);
		this.text.anchorX = "center";
		this.text.anchorY = "35%";
		this.text.lineHeight = 1.0;
		this.text.color = 0xffffff;
		this.text.sync();
	}
}
