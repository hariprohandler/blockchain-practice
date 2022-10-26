const { GENISIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
    constructor({ timestamp, lastHash, hash, data }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
    static genisisBlock() {
        // return new Block(GENISIS_DATA);
        return new this(GENISIS_DATA); // factory method, functions that create instances of the class
    }

    static minedBlock({ lastBlock, data}) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        return new this({
            timestamp,
            lastHash: lastHash,
            data,
            hash: cryptoHash(timestamp, lastHash, data)
        });
    }
}

// const block1 = new Block({
//     timestamp: '01/01/01',
//     lastHash: 'foo-lastHash',
//     hash: 'foo-hash',
//     data: 'foo-data'
// });
// console.log('block1', block1);

module.exports = Block;