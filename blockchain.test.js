const Blockchain = require('./Blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain, newChain, orgChain;
    beforeEach(()=>{
        blockchain = new Blockchain();
        newChain = new Blockchain();
        orgChain = blockchain.chain;
    })

    it('conatins a chain array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with genisis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genisisBlock())
    });

    it('adds a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({ data: newData });

        expect(blockchain.chain[blockchain.chain.length - 1].data)
        .toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when the chain does not start with genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = {
                    data: 'fake-genesis'
                }

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            })
        })
        describe('when the chain starts with genesis block and has multiple blocks', () => {
            beforeEach(()=>{
                blockchain.addBlock({ data: 'Bears' });
                blockchain.addBlock({ data: 'Beets' });
                blockchain.addBlock({ data: 'Carrots' });
            });
            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })  
            });

            describe('and the chain contains a block with invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'some-bad-and-evil-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })  
            });

            describe('Chain is valid ', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                })  
            });
        })
    });


    describe('replaceChain()', ()=>{
        describe('When the new chain is not longer', () =>{
            it('does not replace the chain', () => {
                newChain.chain[0] = { new: 'Chain' };
                blockchain.replaceChain(newChain.chain);

                expect(blockchain.chain).toEqual(orgChain);
            })
        });

        describe('when the chain is longer', () => {
            beforeEach(()=>{
                newChain.addBlock({ data: 'Bears' });
                newChain.addBlock({ data: 'Beets' });
                newChain.addBlock({ data: 'Carrots' });
            });

            describe('chain is invalid', () => {
                it('does not replace the chain', () => {
                    newChain.chain[2].hash = 'some-fake-hash';

                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(orgChain);
                })
            })
            describe('chain is valid', () => {
                it('It replaces the chain', () => {
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);
                })
            })
        })
    })

    
})