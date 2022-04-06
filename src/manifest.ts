export class Manifest {
    instructions: string[];

    constructor(instructions: string[]) {
        this.instructions = instructions;
    }
}

export class ManifestBuilder {
    private readonly instructions: string[];

    constructor() {
        this.instructions = [];
    }

    clearAuthZone(): ManifestBuilder {
        this.instructions.push('CLEAR_AUTH_ZONE;\n');
        return this;
    }

    build(): Manifest {
        return new Manifest(this.instructions);
    }
}