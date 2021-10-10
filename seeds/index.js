const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <200 ; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;

        const camp = new Campground({
            author:'615982840b2826b1eca6c915',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point',
                coordinates: [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                 ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/drdg6tx1q/image/upload/v1633506935/Campy/qndzirvmojsig8pi62uz.jpg',
                  filename: 'Campy/qndzirvmojsig8pi62uz'
                }
              ],
            description: 'bla bla',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})