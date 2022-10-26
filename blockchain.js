const Block = require('./block');
const cryptoHash = require('./crypto-hash');
class Blockchain {
    constructor() {
        this.chain = [Block.genisisBlock()];
    }

    addBlock({ data }) {
        const newBlock = Block.minedBlock({
            lastBlock: this.chain[this.chain.length -1],
            data
        })
        this.chain.push(newBlock);
    }

    static isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== 
        JSON.stringify(Block.genisisBlock())) {
            return false;
        }

        for(let i = 1; i< chain.length; i++) {
            const {timestamp, lastHash, hash, data } = chain[i];

            const actualLashHash = chain[i-1].hash;

            if(lastHash !== actualLashHash) {
                return false;
            }

            const validatedHash = cryptoHash(timestamp, lastHash, data);

            if(hash !== validatedHash) return false;
            
        }

        return true;
    }

    replaceChain(chain) {
        if(chain.length <= this.chain.length) {
            return;
        }
        if(!Blockchain.isValidChain(chain)) {
            return;
        }
        this.chain = chain;
    }
}

module.exports =  Blockchain;