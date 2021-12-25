import { initializeScene } from "./init/init.js";
import { drawScene } from "./system/renderer.js";
import { Entity } from "./entity/entity.js";
import * as mat4 from "./ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";
import * as quat from "./ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/quat.js";
import { materials } from "./component/material.js";

document.getElementById("canvasBody").onload = () => {webGLStart()};

var blochData = [];
const animation_steps = 30;

// This function initializes gl, animation and draws basic sphere and axis for a canvas
export function initBloch(canvasId) {
    let canvasData = {};
    const canvas = document.getElementById(canvasId);
    const textCanvas = document.getElementById(canvasId + "-text");
    let gl = initGL(canvas);
    let ctx = textCanvas.getContext("2d");

    canvasData.canvas = canvas;
    canvasData.gl = gl;
    canvasData.dragging = false;
    canvasData.textCanvas = textCanvas;
    canvasData.ctx = ctx;

    ctx.font = "20px sans-serif"

    textCanvas.addEventListener("click", e => {
        if(!canvasData.dragging) {
            canvasData.dragging = true;
            canvasData.currX = e.offsetX; 
        } else {
            canvasData.dragging = false;
        }
    });


    textCanvas.addEventListener("mousemove", e => {
        if (canvasData.dragging) {
            let curMatrix = canvasData.entities.root.nodeMMatrix;
            mat4.rotate(curMatrix, curMatrix, (e.offsetX - canvasData.currX) * 0.005, [0, 1, 0]);
            canvasData.entities.root.nodeMMatrix = curMatrix;
            canvasData.currX = e.offsetX;
        }
    })

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    initializeScene(canvasData);
    initViewPort(gl, canvas);

    canvasData.entities.vectors = [];

    return canvasData;
}

// Adds a vector to a canvas, based on theta and phi angles (in degrees)
export function addVector(canvasData, theta, phi) {
    let renderers = canvasData.renderers;
    let primitives = canvasData.primitives;
    let entities = canvasData.entities;
    var vectorMatrix = mat4.create();
    let quatRot = quat.create();
    quat.fromEuler(quatRot, 0, phi, theta);
    mat4.fromQuat(vectorMatrix, quatRot);
    
    mat4.translate(vectorMatrix, vectorMatrix, [0.5, 0.0, 0.0]);
    mat4.scale(vectorMatrix, vectorMatrix, [1.0, 0.07, 0.07]);
    let vector = new Entity(vectorMatrix, primitives.cube, materials.yellowish, renderers.lighting, null, []);
    vector.theta = theta;
    vector.phi = phi;
    vector.steps = 0;

    entities.root.children.push(vector);
    entities.vectors.push(vector);
    return vector;
}

// Updates postion of the vector on canvas
export function updateVector(canvasData, vector, theta, phi) {
    vector.steps = animation_steps;
    vector.newTheta = theta;
    vector.newPhi = phi;

    return vector;
}

function updateVectorImmediatePosition(canvasData, vector, theta, phi) {
    var vectorMatrix = mat4.create();
    let quatRot = quat.create();
    quat.fromEuler(quatRot, 0, phi, theta);
    mat4.fromQuat(vectorMatrix, quatRot);
    
    mat4.translate(vectorMatrix, vectorMatrix, [0.5, 0.0, 0.0]);
    mat4.scale(vectorMatrix, vectorMatrix, [1.0, 0.07, 0.07]);

    vector.nodeMMatrix = vectorMatrix;
    return vector;
}

function webGLStart() {
    blochData.push(initBloch("bloch1"));
    blochData.push(initBloch("bloch2"));

    let vec1 = addVector(blochData[0], 30, -60);
    addVector(blochData[1], 30, -30);

    updateVector(blochData[0], vec1, -60, -60);
    
    beginAnimationLoop();
}

function initGL(canvas) {
    let gl;
    try {
        gl = canvas.getContext("webgl2");
        gl.canvasWidth = canvas.width;
        gl.canvasHeight = canvas.height;
    } catch (e) {
        alert("Exception initializing gl");
    }
    return gl;
}

function initViewPort(gl, canvas) {
    var viewportContext = {};
    const rect = canvas.getBoundingClientRect();
    viewportContext.minX = rect.left;
    viewportContext.minY = rect.top;
    viewportContext.maxX = rect.right;
    viewportContext.maxY = rect.bottom;
    viewportContext.xWindowRatio = (viewportContext.maxX - viewportContext.minX) / window.innerWidth;
    viewportContext.yWindowRatio = (viewportContext.maxY - viewportContext.minY) / window.innerHeight;
    const size = canvas.width < canvas.height ? canvas.height : canvas.width;
    gl.viewport(0, 0, size, size); 
}

export function beginAnimationLoop() {
    requestAnimationFrame(timeStep);
}

function timeStep(timestamp) {
    for(let bloch of blochData) {
        for(let vector of bloch.entities.vectors) {
            if(vector.steps != 0) {
                let theta = vector.theta + ((animation_steps - vector.steps) * (vector.newTheta - vector.theta)) / animation_steps;
                let phi = vector.phi + ((animation_steps - vector.steps) * (vector.newPhi - vector.phi)) / animation_steps;
                updateVectorImmediatePosition(bloch, vector, theta, phi);
                vector.steps = vector.steps - 1;
                if(vector.steps == 0) {
                    vector.theta = vector.newTheta;
                    vector.phi = vector.newPhi;
                }
            }
        }
        drawScene(bloch);
    }

    requestAnimationFrame(timeStep);
}