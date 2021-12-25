export class Primitive {
    constructor(canvasData, primitiveVertices, primitiveIndices, primitiveNormals, primitiveTangents, primitiveTexels) {
        let vertexArrays = canvasData.vertexArrays;
        const vertexOffset = vertexArrays.vertexPositions.length / 3;
        const indices = primitiveIndices.map(x => x + vertexOffset);
        const indexBufferOffset = vertexArrays.vertexIndices.length;
        const numIndices = indices.length;
        const initialVertexPositionOffset = vertexArrays.vertexPositions.length / 3;
        const numVertices = primitiveVertices.length / 3;

        vertexArrays.vertexPositions = vertexArrays.vertexPositions.concat(primitiveVertices);
        vertexArrays.vertexIndices = vertexArrays.vertexIndices.concat(indices);
        vertexArrays.vertexNormals = vertexArrays.vertexNormals.concat(primitiveNormals);
        vertexArrays.vertexTangents = vertexArrays.vertexTangents.concat(primitiveTangents);
        vertexArrays.vertexTexels = vertexArrays.vertexTexels.concat(primitiveTexels);

        this.indexBufferOffset = indexBufferOffset;
        this.numIndices = numIndices;
        this.initialVertexPositionOffset = initialVertexPositionOffset;
        this.numVertices = numVertices;
    }
}
