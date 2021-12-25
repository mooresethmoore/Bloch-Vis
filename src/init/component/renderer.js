import { Renderer } from "../../component/renderer.js";
import * as mat4 from "../../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";

export function initRenderers(canvasData) {
    let gl = canvasData.gl;
    let renderers = {};
    renderers.lighting = new Renderer(gl,
        "../shader/vertex-shader-lighting.glsl",
        "../shader/fragment-shader-lighting.glsl",
        function(gl, shaderProgram) {
            shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
            gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

            shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
            shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
            shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
            shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                
            shaderProgram.ambientCoeff = gl.getUniformLocation(shaderProgram, "uAmbientCoeff");
            shaderProgram.diffuseCoeff = gl.getUniformLocation(shaderProgram, "uDiffuseCoeff");
            shaderProgram.specularCoeff = gl.getUniformLocation(shaderProgram, "uSpecularCoeff");
            shaderProgram.shininessCoeff = gl.getUniformLocation(shaderProgram, "uShininess");
                
            shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
            shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
            shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
            shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
        },
        function(gl, drawInput) {
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

            var mvMatrix = mat4.create();
            mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

            var mvpMatrix = mat4.create();
            mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

            var normalMatrix = mat4.create();
            mat4.invert(normalMatrix, mvMatrix);
            mat4.transpose(normalMatrix, normalMatrix);

            gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, drawInput.vMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);

            gl.uniform3fv(this.shaderProgram.ambientCoeff, drawInput.material.ambientCoeff);
            gl.uniform3fv(this.shaderProgram.diffuseCoeff, drawInput.material.diffuseCoeff);
            gl.uniform3fv(this.shaderProgram.specularCoeff, drawInput.material.specularCoeff);
            gl.uniform1f(this.shaderProgram.shininessCoeff, drawInput.material.shininess);

            gl.uniform3fv(this.shaderProgram.lightAmbient, drawInput.lightProperties.ambient);
            gl.uniform3fv(this.shaderProgram.lightDiffuse, drawInput.lightProperties.diffuse);
            gl.uniform3fv(this.shaderProgram.lightSpecular, drawInput.lightProperties.specular);
            gl.uniform3fv(this.shaderProgram.lightPosition, drawInput.lightProperties.lightPosition);

            gl.drawElements(gl.TRIANGLES, drawInput.primitive.numIndices, gl.UNSIGNED_SHORT, drawInput.primitive.indexBufferOffset * 2);
        }
    );

    renderers.translucent = new Renderer(gl,
        "../shader/vertex-shader-lighting.glsl",
        "../shader/fragment-shader-translucent.glsl",
        function(gl, shaderProgram) {
            shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
            gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

            shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
            shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
            shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
            shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                
            shaderProgram.ambientCoeff = gl.getUniformLocation(shaderProgram, "uAmbientCoeff");
            shaderProgram.diffuseCoeff = gl.getUniformLocation(shaderProgram, "uDiffuseCoeff");
            shaderProgram.specularCoeff = gl.getUniformLocation(shaderProgram, "uSpecularCoeff");
            shaderProgram.shininessCoeff = gl.getUniformLocation(shaderProgram, "uShininess");
                
            shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
            shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
            shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
            shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
        },
        function(gl, drawInput) {
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

            var mvMatrix = mat4.create();
            mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

            var mvpMatrix = mat4.create();
            mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

            var normalMatrix = mat4.create();
            mat4.invert(normalMatrix, mvMatrix);
            mat4.transpose(normalMatrix, normalMatrix);

            gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, drawInput.vMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);

            gl.uniform3fv(this.shaderProgram.ambientCoeff, drawInput.material.ambientCoeff);
            gl.uniform3fv(this.shaderProgram.diffuseCoeff, drawInput.material.diffuseCoeff);
            gl.uniform3fv(this.shaderProgram.specularCoeff, drawInput.material.specularCoeff);
            gl.uniform1f(this.shaderProgram.shininessCoeff, drawInput.material.shininess);

            gl.uniform3fv(this.shaderProgram.lightAmbient, drawInput.lightProperties.ambient);
            gl.uniform3fv(this.shaderProgram.lightDiffuse, drawInput.lightProperties.diffuse);
            gl.uniform3fv(this.shaderProgram.lightSpecular, drawInput.lightProperties.specular);
            gl.uniform3fv(this.shaderProgram.lightPosition, drawInput.lightProperties.lightPosition);

            gl.drawElements(gl.TRIANGLES, drawInput.primitive.numIndices, gl.UNSIGNED_SHORT, drawInput.primitive.indexBufferOffset * 2);
        }
    );

    renderers.lines = new Renderer(gl,
        "../shader/vertex-shader-lighting.glsl",
        "../shader/fragment-shader-lighting.glsl",
        function(gl, shaderProgram) {
            shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
            gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

            shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
            shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
            shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
            shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                
            shaderProgram.ambientCoeff = gl.getUniformLocation(shaderProgram, "uAmbientCoeff");
            shaderProgram.diffuseCoeff = gl.getUniformLocation(shaderProgram, "uDiffuseCoeff");
            shaderProgram.specularCoeff = gl.getUniformLocation(shaderProgram, "uSpecularCoeff");
            shaderProgram.shininessCoeff = gl.getUniformLocation(shaderProgram, "uShininess");
                
            shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
            shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
            shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
            shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
        },
        function(gl, drawInput) {
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

            var mvMatrix = mat4.create();
            mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

            var mvpMatrix = mat4.create();
            mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

            var normalMatrix = mat4.create();
            mat4.invert(normalMatrix, mvMatrix);
            mat4.transpose(normalMatrix, normalMatrix);

            gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, drawInput.vMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);

            gl.uniform3fv(this.shaderProgram.ambientCoeff, drawInput.material.ambientCoeff);
            gl.uniform3fv(this.shaderProgram.diffuseCoeff, drawInput.material.diffuseCoeff);
            gl.uniform3fv(this.shaderProgram.specularCoeff, drawInput.material.specularCoeff);
            gl.uniform1f(this.shaderProgram.shininessCoeff, drawInput.material.shininess);

            gl.uniform3fv(this.shaderProgram.lightAmbient, drawInput.lightProperties.ambient);
            gl.uniform3fv(this.shaderProgram.lightDiffuse, drawInput.lightProperties.diffuse);
            gl.uniform3fv(this.shaderProgram.lightSpecular, drawInput.lightProperties.specular);
            gl.uniform3fv(this.shaderProgram.lightPosition, drawInput.lightProperties.lightPosition);

            gl.drawArrays(gl.LINE_LOOP, drawInput.primitive.initialVertexPositionOffset, drawInput.primitive.numVertices);
        }
    );

    canvasData.renderers = renderers;
}