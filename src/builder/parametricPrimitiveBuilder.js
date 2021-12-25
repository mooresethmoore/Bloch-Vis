import { buildParametricPrimitive } from "../common/parametric.js";

export function buildSphere(canvasData) {
    return buildParametricPrimitive(canvasData, -1.0, 1.2, 40.0, -0.5, 0.525, 40.0,
        function(u, v) {
            return [Math.cos(Math.PI * v) * Math.cos(Math.PI * u), Math.cos(Math.PI * v) * Math.sin(Math.PI * u), Math.sin(Math.PI * v)];
        },
        function(u, v) {
            return [-1 * Math.PI * Math.cos(Math.PI * v) * Math.sin(Math.PI * u), Math.PI * Math.cos(Math.PI * v) * Math.cos(Math.PI * u), 0];
        },
        function(u , v) {
            return [-1 * Math.PI * Math.sin(Math.PI * v) * Math.cos(Math.PI * u), -1 * Math.PI * Math.sin(Math.PI * v) * Math.sin(Math.PI * u), Math.PI * Math.cos(Math.PI * v)];
        }
    );
}

export function buildSphere2(canvasData) {
    return buildParametricPrimitive(canvasData, -1.0, 1.2, 20.0, -0.5, 0.525, 40.0,
        function(u, v) {
            return [Math.cos(Math.PI * v) * Math.cos(Math.PI * u), Math.cos(Math.PI * v) * Math.sin(Math.PI * u), Math.sin(Math.PI * v)];
        },
        function(u, v) {
            return [-1 * Math.PI * Math.cos(Math.PI * v) * Math.sin(Math.PI * u), Math.PI * Math.cos(Math.PI * v) * Math.cos(Math.PI * u), 0];
        },
        function(u , v) {
            return [-1 * Math.PI * Math.sin(Math.PI * v) * Math.cos(Math.PI * u), -1 * Math.PI * Math.sin(Math.PI * v) * Math.sin(Math.PI * u), Math.PI * Math.cos(Math.PI * v)];
        }
    );
}