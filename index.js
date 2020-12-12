const TorrentSearchApi = require('torrent-search-api');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());;

const port = process.env.port || 3000;
TorrentSearchApi.enablePublicProviders();

app.get('/', (req, res) => {
    res.send('ഇവിടെ ഒരു മൈരും ഇല്ല !');
});

app.get('/search/:text', async (req, res) => {
    try {
        const torrents = await TorrentSearchApi.search(req.params.text);
        res.json({
            torrents,
            count: torrents.length,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
