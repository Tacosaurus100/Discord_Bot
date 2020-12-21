import * as mjAPI from 'mathjax-node-svg2png';

export class LatexConverter {
    public static async convert(latex: string) {
        return new Promise((resolve, reject) => {

            const options = {
                math: `\\color{white}{${latex}}`,
                format: 'TeX',
                png: true,
                scale: 2
            };


            mjAPI.typeset(options, result => {
                if (!result.errors) {
                    const pngString = result.png.replace(/^data:image\/png;base64,/, ""), image = Buffer.from(pngString, 'base64');
                    resolve(image);
                } else {
                    reject(result.errors);
                }
            });
        });
    }
}