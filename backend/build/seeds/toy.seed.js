"use strict";
// Put default initial data for about toy documents of the test database here
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        _id: '000000000000',
        name: 'Captain America',
        user: {
            _id: '000000000000',
            username: 'avenger_lover',
            toysOwned: [],
            registerDate: Date.now(),
        },
        manufacturer: 'Hot Toys',
        date_posted: new Date(),
        description: 'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
        image_url: 'https://m.media-amazon.com/images/I/61e7q+l8V4L._AC_SL1000_.jpg',
        franchise: 'Marvel',
        series: 'Avengers: Endgame',
    },
    {
        _id: '000000000001',
        name: 'Thor 1/6 Scale',
        // TODO: Data structure for users still being decided
        user: {
            _id: '000000000001',
            username: 'Thor_fan',
            toysOwned: [],
            registerDate: Date.now(),
        },
        manufacturer: 'Hot Toys',
        date_posted: new Date(),
        description: 'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
        image_url: 'https://www.sideshow.com/storage/product-images/903422/thor_marvel_silo.png',
        franchise: 'Marvel',
        series: 'Avengers: Infinity War',
    },
    {
        _id: '000000000002',
        name: 'mg 1/100 Gundam Epyon EW',
        user: {
            _id: '000000000002',
            username: 'Meijin_Kawaguchi_3',
            toysOwned: [],
            registerDate: Date.now(),
        },
        manufacturer: 'Bandai',
        date_posted: new Date(),
        description: 'This is a highly detailed and engineered Master Grade model of the infamous Gundam Epyon, piloted by Zechs Merquise. Utilizing Hajime Katokis design, this completely poseable Epyon model features a complete inner frame with removable armor and several gimmicks the Master Grade Series is known for including Transformation to flight mode and a high level of detail in 1 to 100 scale.',
        image_url: 'https://cdn.shopify.com/s/files/1/0727/8355/products/mg-oz-13ms-gundam-epyon-ew-ver-01-removebg-preview_900x900.png?v=1618872377',
        franchise: 'Gundam',
        series: 'Gundam Wing',
    },
];
