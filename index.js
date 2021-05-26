const TorrentSearchApi = require('torrent-search-api');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());

const port = process.env.PORT || 5000;
TorrentSearchApi.enablePublicProviders();

const cache = {};

app.get('/', (req, res) => {
    res.send('ഇവിടെ ഒരു മൈരും ഇല്ല !');
});

app.get('/search/:text', async (req, res) => {
    console.log('Search:', req.params.text);

    if (cache[req.params.text.toLowerCase()]) {
        console.log('Sending cached data...');
        return res.json(cache[req.params.text]);
    }

    try {
        const torrents = await TorrentSearchApi.search(req.params.text);
        const result = {
            torrents,
            count: torrents.length,
        };
        cache[req.params.text.toLowerCase()] = result;
        return res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('പൂണ്ട  മൈര്, സെർവർ  ഊമ്പി ');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
