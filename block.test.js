const Block = require('./block');
const { GENISIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');
describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'baar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
        timestamp,
        lastHash,
        hash,
        data
    });

    it('has a timestamp, lastHash, hash, and data property', () => {
        expect(block.timestamp).toEqual(timestamp)
        expect(block.lastHash).toEqual(lastHash)
        expect(block.hash).toEqual(hash)
        expect(block.data).toEqual(data)
    })

    describe('genisis()', () => {
        const genisisBlock = Block.genisisBlock();
        console.log('genisisBlock', genisisBlock);
        it('Returns a block instance', () => {
            expect(genisisBlock instanceof Block).toBe(true);
        });
        it('Returns a genis data', () => {
            expect(genisisBlock).toEqual(GENISIS_DATA);
        })
    })

    describe('minedBlock()', () => {
        const lastBlock = Block.genisisBlock();
        const data = 'mined block';
        const minedBlock = Block.minedBlock({ lastBlock, data})
        console.log('minedBlock', minedBlock);
        it('Returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });
        it('sets the data', () => {
            expect(minedBlock.data).toEqual(data);
        });
        it('sets a timestamp', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        })

        it('creates sha256 hash based on inputs', () => {
            expect(minedBlock.hash)
            .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data))
        })
    })
});