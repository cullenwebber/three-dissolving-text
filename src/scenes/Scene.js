import * as THREE from "three";
import WebGLContext from "../core/WebGLContext";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import WebGLText from "../utils/WebGLText";
import vertexShader from "../shaders/text.vert.glsl";
import fragmentShader from "../shaders/text.frag.glsl";
import gsap from "gsap";

export default class Scene {
	constructor() {
		this.context = null;
		this.camera = null;
		this.cameraRig = null;
		this.width = 0;
		this.height = 0;
		this.aspectRatio = 0;
		this.scene = null;
		this.envMap = null;
		this.#init();
	}

	async #init() {
		this.#setContext();
		this.#setupScene();
		this.#setupCamera();
		await this.#addObjects();
		this.#addAnimations();
	}

	#setContext() {
		this.context = new WebGLContext();
	}

	#setupScene() {
		this.scene = new THREE.Scene();
		const environment = new RoomEnvironment();
		const pmremGenerator = new THREE.PMREMGenerator(this.context.renderer);
		this.envMap = pmremGenerator.fromScene(environment).texture;
		this.scene.environment = this.envMap;
		this.scene.environmentIntensity = 1.0;
		this.scene.background = new THREE.Color(0x000000);
	}

	#setupCamera() {
		this.#calculateAspectRatio();
		this.camera = new THREE.PerspectiveCamera(45, this.aspectRatio, 0.001, 100);
		this.camera.position.z = 8;
		this.camera.position.y = -0.5;
	}

	async #addObjects() {
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				time: { value: 0.0 },
				progress: { value: 0.0 },
				direction: { value: 1.0 },
			},
		});
		this.material2 = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				time: { value: 0.0 },
				progress: { value: 1.0 },
				direction: { value: -1.0 },
			},
		});
		this.text = new WebGLText("CULLEN");
		this.text2 = new WebGLText("WEBBER");
		this.text.material = this.material;
		this.text2.material = this.material2;
		this.scene.add(this.text);
		this.scene.add(this.text2);
	}

	#addAnimations() {
		this.tl = gsap
			.timeline({
				yoyo: true,
				repeat: -1,
				defaults: {
					ease: "sine.inOut",
					duration: 4,
				},
			})
			.to(this.material.uniforms.progress, {
				value: 1.0,
			})
			.to(
				this.material2.uniforms.progress,
				{
					value: 0.0,
				},
				"<=23%",
			);
	}

	#calculateAspectRatio() {
		const { width, height } = this.context.getFullScreenDimensions();
		this.width = width;
		this.height = height;
		this.aspectRatio = this.width / this.height;
	}

	animate(delta, elapsed) {
		this.material && (this.material.uniforms.time.value = elapsed);
	}

	onResize(width, height) {
		this.width = width;
		this.height = height;
		this.aspectRatio = width / height;

		this.camera.aspect = this.aspectRatio;
		this.camera.updateProjectionMatrix();
	}
}
