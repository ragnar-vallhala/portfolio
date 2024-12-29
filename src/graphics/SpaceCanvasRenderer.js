let mousePos = [0, 0];
let gl = null;
let resolution;
let program = null;
let buffer = null;
let firstCallTime = performance.now();
let lastCallTime = performance.now();
const minFrameTime = 16; // in ms to 60 fps
const viewportPos = [0, 0];
let mousePosition = [0, 0];
let vsyncEnable = true;
const n = 10; // Number of columns
const m = 10; // Number of rows
let vertexShader = `#version 300 es
in vec2 a_Position; // Vertex position input
out vec2 v_FragCoord; // Pass the fragment coordinates to the fragment shader

void main() {
    gl_Position = vec4(a_Position,0.0,1.0);  // Position of the vertex
}
`;

let fragmentShader = `#version 300 es
precision mediump float;
uniform vec2 u_Resolution;    // Resolution of viewport in pixel coordinate
uniform float u_Time;         // Time elasped since start (in seconds)
uniform vec2  u_Mouse;        // Mouse position in pixel coordinate
uniform vec2 u_Pos;
uniform float u_Radius;
out vec4 fragColor;
void main() {
      fragColor=vec4(1.0,0.0,0.0,1.0);
}
`;

const get_canvas_size = () => {
  const dim = [window.innerWidth, window.innerHeight]
  return dim;
}


export const render_glsl = (canvasRef) => {
  const canvas = canvasRef.current;
  gl = canvas.getContext('webgl2');
  if (!gl) {
    console.error('WebGL not supported');
    alert("WebGL2 not supported on this browser. Try something else.")
    return;
  }
  resolution = get_canvas_size();
  gl.viewport(0, 0, resolution[0], resolution[1]);
  program = getProgram(gl, vertexShader, fragmentShader);
  if (!program) return;

  setBuffers(gl);
  const render = () => {
    // updates
    if (get_canvas_size()[0] !== resolution[0] || get_canvas_size()[1] !== resolution[1]) {
      cleanup();
      resolution[0] = get_canvas_size()[0];
      resolution[1] = get_canvas_size()[1];
      return render_glsl(canvasRef);
    }
    resolution = get_canvas_size();
    gl.viewport(0, 0, resolution[0], resolution[1]);
    set_uniforms(gl);
    const currentTime = performance.now();
    if (vsyncEnable && currentTime - lastCallTime < minFrameTime) {
      requestAnimationFrame(render);
    }
    else {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6*n*m);
      lastCallTime = currentTime;
      requestAnimationFrame(render);
    }
  };

  render();
};

export const cleanup = () => {
  if(gl!=null){
      setBuffers(gl);
  }
};

const compileShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};
const getProgram = (gl, vertexShader, fragmentShader) => {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return null;
  }

  gl.useProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  firstCallTime = performance.now();
  return program;
};
const createMesh = (n, m) => {
  const vertices = [];
  const aspectRatio = resolution[0] / resolution[1]; // Canvas width / height
  const dx = 2 / n; // Width of each rectangle in NDC
  const dy = 2 / m; // Height of each rectangle in NDC

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const x0 = -aspectRatio + j * dx * aspectRatio; // Bottom-left x
      const y0 = -1 + i * dy;                        // Bottom-left y
      const x1 = x0 + dx * aspectRatio;              // Top-right x
      const y1 = y0 + dy;                            // Top-right y

      // Two triangles to form the rectangle
      vertices.push(
        x0, y0, // Bottom-left
        x1, y0, // Bottom-right
        x0, y1, // Top-left

        x0, y1, // Top-left
        x1, y0, // Bottom-right
        x1, y1  // Top-right
      );
    }
  }

  return new Float32Array(vertices);
};
;
const setBuffers = (gl) => {

  const vertices = createMesh(n, m);
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);
};

const set_uniforms = (gl) => {
  // u_resolution (make sure resolution is updated)
  resolution = get_canvas_size();
  const uResolution = gl.getUniformLocation(program, 'u_Resolution');
  gl.uniform2f(uResolution, resolution[0], resolution[1]);


  // u_time
  const uTime = gl.getUniformLocation(program, 'u_Time');
  gl.uniform1f(uTime, (performance.now() - firstCallTime) / 1000);

  // u_mouse
  const uMouse = gl.getUniformLocation(program, 'u_Mouse');
  gl.uniform2f(uMouse, get_mouse_pos()[0], get_mouse_pos()[1]);

};
const get_mouse_pos = () => {
  let x = mousePos[0];
  let y = mousePos[1];


  // clamping X
  if (x < viewportPos[0]) {
    x = viewportPos[0];
  } else if (x > viewportPos[0] + resolution[0]) {
    x = viewportPos[0] + resolution[0];
  }
  // clamping Y
  if (y < viewportPos[1]) {
    y = viewportPos[1];
  } else if (y > viewportPos[1] + resolution[1]) {
    y = viewportPos[1] + resolution[1];
  }


  // make in pixel coordinate
  x -= viewportPos[0];
  y -= viewportPos[1];
  mousePosition = [x, y];
  return [x, y];
}

document.addEventListener('mousemove', (event) => {
  mousePos[0] = event.clientX; // X coordinate relative to the viewport
  mousePos[1] = event.clientY; // Y coordinate relative to the viewport
});



