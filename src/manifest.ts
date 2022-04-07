export class Manifest {
    instructions: string[];

    constructor(instructions: string[]) {
        this.instructions = instructions;
    }
}

export class ManifestBuilder {
    private readonly instructions: string[];
    private readonly buckets: Map<string, number>;
    private readonly proofs: Map<string, number>;
    private id_allocator: number;

    constructor() {
        this.instructions = [];
        this.buckets = new Map<string, number>();
        this.proofs = new Map<string, number>();
        this.id_allocator = 512;
    }

    takeFromWorktop(resourceAddress: string, bucket: string): ManifestBuilder {
        this.instructions.push('TAKE_FROM_WORKTOP ResourceAddress("' + resourceAddress + '") Bucket("' + bucket + '");')
        this.buckets.set(bucket, this.id_allocator++);
        return this;
    }

    takeFromWorktopByAmount(amount: number, resourceAddress: string, bucket: string): ManifestBuilder {
        this.instructions.push('TAKE_FROM_WORKTOP_BY_AMOUNT Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '") Bucket("' + bucket + '");')
        this.buckets.set(bucket, this.id_allocator++);
        return this;
    }

    takeFromWorktopByIds(nonFungibleIds: string[], resourceAddress: string, bucket: string): ManifestBuilder {
        this.instructions.push('TAKE_FROM_WORKTOP_BY_IDS ' + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '") Bucket("' + bucket + '");')
        this.buckets.set(bucket, this.id_allocator++);
        return this;
    }

    returnToWorktop(bucket: string) {
        this.instructions.push('RETURN_TO_WORKTOP Bucket("' + bucket + '");')
        return this;
    }

    assertWorktopContains(resourceAddress: string): ManifestBuilder {
        this.instructions.push('ASSERT_WORKTOP_CONTAINS ResourceAddress("' + resourceAddress + '");')
        return this;
    }

    assertWorktopContainsByAmount(amount: number, resourceAddress: string): ManifestBuilder {
        this.instructions.push('ASSERT_WORKTOP_CONTAINS_BY_AMOUNT Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '");')
        return this;
    }

    assertWorktopContainsByIds(nonFungibleIds: string[], resourceAddress: string): ManifestBuilder {
        this.instructions.push('ASSERT_WORKTOP_CONTAINS_BY_IDS ' + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '");')
        return this;
    }

    popFromAuthZone(proof: string): ManifestBuilder {
        this.instructions.push('POP_FROM_AUTH_ZONE Proof("' + proof + '");')
        this.proofs.set(proof, this.id_allocator++);
        return this;
    }

    pushToAuthZone(proof: string): ManifestBuilder {
        this.instructions.push('PUSH_TO_AUTH_ZONE Proof("' + proof + '");')
        return this;
    }

    clearAuthZone(): ManifestBuilder {
        this.instructions.push('CLEAR_AUTH_ZONE;\n');
        return this;
    }

    createProofFromAuthZone(resourceAddress: string, proof: string): ManifestBuilder {
        this.instructions.push('CREATE_PROOF_FROM_AUTH_ZONE ResourceAddress("' + resourceAddress + '") Proof("' + proof + '");')
        this.proofs.set(proof, this.id_allocator++);
        return this;
    }

    createProofFromAuthZoneByAmount(amount: number, resourceAddress: string, proof: string): ManifestBuilder {
        this.instructions.push('CREATE_PROOF_FROM_AUTH_ZONE_BY_AMOUNT Decimal("' + amount + '") ResourceAddress("' + resourceAddress + '") Proof("' + proof + '");')
        this.proofs.set(proof, this.id_allocator++);
        return this;
    }

    createProofFromAuthZoneByIds(nonFungibleIds: string[], resourceAddress: string, proof: string): ManifestBuilder {
        this.instructions.push('CREATE_PROOF_FROM_AUTH_ZONE_BY_IDS ' + this.formatNonFungibleIds(nonFungibleIds) + ' ResourceAddress("' + resourceAddress + '") Proof("' + proof + '");')
        this.proofs.set(proof, this.id_allocator++);
        return this;
    }

    cloneProof(proof: string, clone: string): ManifestBuilder {
        this.instructions.push('CLONE_PROOF Proof("' + proof + '") Proof("' + clone + '");')
        this.proofs.set(clone, this.id_allocator++);
        return this;
    }

    dropProof(proof: string): ManifestBuilder {
        this.instructions.push('DROP_PROOF Proof("' + proof + '");')
        return this;
    }

    // TODO: call function/method and publish package

    build(): Manifest {
        return new Manifest(this.instructions);
    }

    private formatNonFungibleIds(nonFungibleIds: string[]) {
        let ids = nonFungibleIds.map(id => 'NonFungibleId("' + id + '")').join(', ');
        return 'BTreeSet<NonFungibleId>(' + ids + ')';
    }
}