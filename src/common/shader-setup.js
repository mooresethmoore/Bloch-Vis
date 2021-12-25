export function getExternalVertexShader(gl, shaderType, path) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, getShaderSource(path));
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function getShaderSource(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    return (request.status == 200) ? request.responseText : null;
}