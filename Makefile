build:
	mkdir build
	tsc JSlider.ts --out build/JSlider.js
	tsc JSlider.ts --module amd --out build/JSlider.amd.js
	tsc JSlider.ts --module commonjs --out build/JSlider.commonjs.js
	closurec build/JSlider.js >> build/JSlider.min.js
clean:
	rm -rf build