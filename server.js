import express from 'express';
import cors from 'cors';
import { exec } from 'child_process'
import iconv  from 'iconv-lite';
const app = express();

app.use(cors()); 
app.get('/get-mac-address', (req, res) => {
    exec('getmac', { encoding: 'buffer' }, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send('getmac有誤!');
        }
        const decodedOutput = iconv.decode(stdout, 'cp950'); //轉繁體
        const matches = decodedOutput.match(/實體位址[\s\S]*?([-\w]{17})/g);
        if (matches) {
            const macAddresses = matches.map(item => item.match(/([-\w]{17})/)[0]);
            res.send(macAddresses[0]);
        } else {
            res.status(404).send('找不到Mac位址!');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`伺服器port ${PORT}`);
});
