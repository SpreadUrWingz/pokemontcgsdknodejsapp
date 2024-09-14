const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let API_KEY;

const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey:`${API_KEY}`})


app.get('/sets', async (req, res) => {
    try {

        console.log(`server called by ${req.ip}`);

        pokemon.set.all({orderBy: "releaseDate", select: "name,id"})
        .then((sets) => {
            res.json(sets);
            console.log('loaded sets\n~~~~~~~~~~~~~~~~~~~~~');
        })
        }
        catch (error) {
            // Handle any errors that occur
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
});

app.get('/cards/:name', async (req, res) => {
    try {

        console.log(`server called by ${req.ip}`);
        console.log(`set to retrieve: ${req.params['name']}`);

        
        pokemon.card.all({ q: `set.id:${req.params['name']}`, orderBy:'number',
                        select: "rarity,name,number,images,set"})
            .then((cards) => {
                res.json(cards);
                console.log(`${req.params['name']} cards sent\n~~~~~~~~~~~~~~~~~~~~~`);

            })
        }
        catch (error) {
            // Handle any errors that occur
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
});


app.listen(port, () => {
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n
                    Server is running
        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
});