export var materials = {};

export class Material {
    constructor(ambientCoeff, diffuseCoeff, specularCoeff, shininess) {
        this.ambientCoeff = ambientCoeff;
        this.diffuseCoeff = diffuseCoeff;
        this.specularCoeff = specularCoeff;
        this.shininess = shininess;
    }
}
