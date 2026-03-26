import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({});

async function parseImage(filename) {
    try {
        const data = fs.readFileSync(filename);
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { inlineData: { data: data.toString('base64'), mimeType: filename.endsWith('png') ? 'image/png' : 'image/jpeg' } },
                'Please transcribe this pricing table exactly into a JSON array of objects. Keys should be "size", "price", "rto36", "rto60". Only output the raw JSON array.'
            ]
        });
        console.log(`\n\n--- Output for ${filename} ---\n`);
        console.log(result.text);
    } catch(e) {
        console.log("Error reading " + filename);
    }
}

async function run() {
    await parseImage('/Users/ciaradees/Downloads/Wood Side Lofted Barn pricing.png');
    await parseImage('/Users/ciaradees/Downloads/Painted Lofted Barn pricing.png');
}

run();
