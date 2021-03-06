const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI || 'd505dd7e86464d1da1865f5017f2e742'
    //dangerous: remove api key when done with docker testing!!
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => { res.json(data)
})
.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};