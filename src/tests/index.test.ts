/* eslint-disable max-len */
import { Encoder } from '../index'
import * as fs from 'fs'

let encoder: Encoder

describe('GPT2', () => {
    beforeAll(async () => {
        // Read tokenizer from file
        const tokenizer = JSON.parse(fs.readFileSync('./tokenizer_files/gpt2_tokenizer.json', 'utf-8'))
        encoder = new Encoder(tokenizer.vocab, tokenizer.merges, tokenizer.specialTokens, tokenizer.config)
    })

    test('Encode', () => {
        const encoded = encoder.encode(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
        expect(encoded).toStrictEqual([
            40, 467, 257, 1310, 517, 510, 290, 314, 1064, 2130, 393, 1223, 612, 13, 198, 39499, 287, 3124, 11,
            351, 257, 1182, 588, 257, 6235, 1353, 290, 257, 6503, 12, 2339, 11, 36808, 1767, 13,
        ])
    })

    test('Decode', () => {
        const decoded = encoder.decode([
            40, 467, 257, 1310, 517, 510, 290, 314, 1064, 2130, 393, 1223, 612, 13, 198, 39499, 287, 3124, 11,
            351, 257, 1182, 588, 257, 6235, 1353, 290, 257, 6503, 12, 2339, 11, 36808, 1767, 13,
        ])
        expect(decoded).toBe(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
    })

    test('Encode with special tokens', () => {
        const encoded = encoder.encode("<|endoftext|>Now then, let's talk about the universe.")
        expect(encoded).toStrictEqual([50256, 3844, 788, 11, 1309, 338, 1561, 546, 262, 6881, 13])
    })

    test('Decode with special tokens', () => {
        const decoded = encoder.decode([50256, 3844, 788, 11, 1309, 338, 1561, 546, 262, 6881, 13])
        expect(decoded).toBe("<|endoftext|>Now then, let's talk about the universe.")
    })
})

describe('Pile', () => {
    beforeAll(async () => {
        // Read tokenizer from file
        const tokenizer = JSON.parse(fs.readFileSync('./tokenizer_files/pile_tokenizer.json', 'utf-8'))
        encoder = new Encoder(tokenizer.vocab, tokenizer.merges, tokenizer.specialTokens, tokenizer.config)
    })

    test('Encode', () => {
        const encoded = encoder.encode(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
        expect(encoded).toStrictEqual([
            42, 564, 247, 1652, 625, 598, 285, 309, 1089, 3095, 390, 1633, 627, 15, 187, 58, 3827, 275, 3295,
            13, 342, 247, 1481, 751, 247, 8042, 1755, 285, 247, 6371, 14, 3022, 13, 36019, 2133, 15,
        ])
    })

    test('Decode', () => {
        const decoded = encoder.decode([
            42, 564, 247, 1652, 625, 598, 285, 309, 1089, 3095, 390, 1633, 627, 15, 187, 58, 3827, 275, 3295,
            13, 342, 247, 1481, 751, 247, 8042, 1755, 285, 247, 6371, 14, 3022, 13, 36019, 2133, 15,
        ])
        expect(decoded).toBe(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
    })

    test('Encode with special tokens', () => {
        const encoded = encoder.encode("<|endoftext|>Now then, let's talk about the universe.")
        expect(encoded).toStrictEqual([0, 4125, 840, 13, 1339, 434, 2312, 670, 253, 10325, 15])
    })

    test('Decode with special tokens', () => {
        const decoded = encoder.decode([0, 4125, 840, 13, 1339, 434, 2312, 670, 253, 10325, 15])
        expect(decoded).toBe("<|endoftext|>Now then, let's talk about the universe.")
    })
})

describe('Genji', () => {
    beforeAll(async () => {
        // Read tokenizer from file
        const tokenizer = JSON.parse(fs.readFileSync('./tokenizer_files/genji_tokenizer.json', 'utf-8'))
        encoder = new Encoder(tokenizer.vocab, tokenizer.merges, tokenizer.specialTokens, tokenizer.config)
    })

    test('Encode', () => {
        const encoded = encoder.encode(
            'ちょっと上へと昇ると何かがいました。\n黄色くて、てっぺんの尖った頭に針金のような細長い身体のへんてこな奴でした。'
        )
        expect(encoded).toStrictEqual([
            39216, 41468, 39890, 30201, 35961, 30201, 16323, 28026, 45762, 44942, 16764, 198, 34202, 31917,
            28134, 23513, 28134, 33180, 49877, 22174, 15474, 108, 244, 7107, 7551, 28618, 19120, 20677, 5641,
            23646, 26945, 5649, 39004, 47108, 5641, 49507, 28134, 46036, 26945, 39353, 30640, 44942, 16764,
        ])
    })

    test('Decode', () => {
        const decoded = encoder.decode([
            39216, 41468, 39890, 30201, 35961, 30201, 16323, 28026, 45762, 44942, 16764, 198, 34202, 31917,
            28134, 23513, 28134, 33180, 49877, 22174, 15474, 108, 244, 7107, 7551, 28618, 19120, 20677, 5641,
            23646, 26945, 5649, 39004, 47108, 5641, 49507, 28134, 46036, 26945, 39353, 30640, 44942, 16764,
        ])
        expect(decoded).toBe(
            'ちょっと上へと昇ると何かがいました。\n黄色くて、てっぺんの尖った頭に針金のような細長い身体のへんてこな奴でした。'
        )
    })

    test('Encode with special tokens', () => {
        const encoded = encoder.encode('<|endoftext|>さあ、宇宙のお話をしましょう。')
        expect(encoded).toStrictEqual([
            27, 91, 437, 1659, 5239, 91, 29, 13327, 23513, 43962, 5641, 29277, 31758, 33067, 35190, 16764,
        ])
    })

    test('Decode with special tokens', () => {
        const decoded = encoder.decode([
            27, 91, 437, 1659, 5239, 91, 29, 13327, 23513, 43962, 5641, 29277, 31758, 33067, 35190, 16764,
        ])
        expect(decoded).toBe('<|endoftext|>さあ、宇宙のお話をしましょう。')
    })
})

describe('Nerdstash', () => {
    beforeAll(async () => {
        // Read tokenizer from file
        const tokenizer = JSON.parse(fs.readFileSync('./tokenizer_files/nerdstash_tokenizer.json', 'utf-8'))
        encoder = new Encoder(tokenizer.vocab, tokenizer.merges, tokenizer.specialTokens, tokenizer.config)
    })

    test('Encode', () => {
        const encoded = encoder.encode(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
        expect(encoded).toStrictEqual([
            49246, 552, 333, 1243, 632, 564, 363, 378, 1075, 2135, 468, 1245, 701, 49230, 85, 27929, 934, 364,
            3508, 49231, 417, 333, 1058, 659, 333, 7108, 1540, 363, 333, 9225, 49255, 2827, 49231, 31451,
            1666, 49230,
        ])
    })

    test('Decode', () => {
        const decoded = encoder.decode([
            49246, 552, 333, 1243, 632, 564, 363, 378, 1075, 2135, 468, 1245, 701, 49230, 85, 27929, 934, 364,
            3508, 49231, 417, 333, 1058, 659, 333, 7108, 1540, 363, 333, 9225, 49255, 2827, 49231, 31451,
            1666, 49230,
        ])
        expect(decoded).toBe(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
    })

    test('Encode with special tokens', () => {
        const encoded = encoder.encode("<|endoftext|>Now then, let's talk about the universe.")
        expect(encoded).toStrictEqual([3, 4303, 817, 49231, 1318, 49256, 49216, 1794, 642, 336, 10575, 49230])
    })

    test('Decode with special tokens', () => {
        const decoded = encoder.decode([
            3, 4303, 817, 49231, 1318, 49256, 49216, 1794, 642, 336, 10575, 49230,
        ])
        expect(decoded).toBe("<|endoftext|>Now then, let's talk about the universe.")
    })
})

describe('Nerdstash v2', () => {
    beforeAll(async () => {
        // Read tokenizer from file
        const tokenizer = JSON.parse(
            fs.readFileSync('./tokenizer_files/nerdstash_tokenizer_v2.json', 'utf-8')
        )
        encoder = new Encoder(tokenizer.vocab, tokenizer.merges, tokenizer.specialTokens, tokenizer.config)
    })

    test('Encode', () => {
        const encoded = encoder.encode(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
        expect(encoded).toStrictEqual([
            49246, 552, 333, 1243, 632, 564, 363, 378, 1075, 2135, 468, 1245, 701, 49230, 85, 27929, 934, 364,
            3508, 49231, 417, 333, 1058, 659, 333, 7108, 1540, 363, 333, 9225, 49255, 2827, 49231, 31451,
            1666, 49230,
        ])
    })

    test('Decode', () => {
        const decoded = encoder.decode([
            49246, 552, 333, 1243, 632, 564, 363, 378, 1075, 2135, 468, 1245, 701, 49230, 85, 27929, 934, 364,
            3508, 49231, 417, 333, 1058, 659, 333, 7108, 1540, 363, 333, 9225, 49255, 2827, 49231, 31451,
            1666, 49230,
        ])
        expect(decoded).toBe(
            'I go a little more up and I find someone or something there.\nYellow in color, with a head like a pointed top and a wire-like, slender body.'
        )
    })

    test('Encode with special tokens', () => {
        const encoded = encoder.encode("<|endoftext|>Now then, let's talk about the universe.")
        expect(encoded).toStrictEqual([3, 4303, 817, 49231, 1318, 5, 1794, 642, 336, 10575, 49230])
    })

    test('Decode with special tokens', () => {
        const decoded = encoder.decode([3, 4303, 817, 49231, 1318, 5, 1794, 642, 336, 10575, 49230])
        expect(decoded).toBe("<|endoftext|>Now then, let's talk about the universe.")
    })
})
