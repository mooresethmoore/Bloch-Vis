import { getExternalVertexShader } from "../common/shader-setup.js";
export class Renderer {
    constructor(gl, vertexShaderPath, fragmentShaderPath, initializer, draw) {
        var shaderProgram = gl.createProgram();
        var vertexShader = getExternalVertexShader(gl, gl.VERTEX_SHADER, vertexShaderPath);
        var fragmentShader = getExternalVertexShader(gl, gl.FRAGMENT_SHADER, fragmentShaderPath);

        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
        
        this.initializer = initializer;

        this.shaderProgram = shaderProgram;
        this.draw = draw;
    }
}
