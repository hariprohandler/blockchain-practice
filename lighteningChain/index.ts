const lightningHash = (data) => `${data}*`;
class Block {
    constructor(data, hash, lasthash) {
        this.data = data;
        this.hash = hash;
        this.lasthash = lasthash;
    }
}

class Blockchain {
    constructor() {
        const genesisBlock  = new Block('gen-data', 'gen-hash', 'gen-lastHash');
        this.chain = [genesisBlock];
    }

    addBlock(data) {
        const lasthash = this.chain[this.chain.length - 1].hash;

        const hash = lightningHash(data + lasthash);

        const block = new Block(data, hash, lasthash);

        this.chain.push(block);
    }
}

const fooBlockchain = new Blockchain();
fooBlockchain.addBlock('one');
fooBlockchain.addBlock('two');
fooBlockchain.addBlock('three');
console.log(fooBlockchain);