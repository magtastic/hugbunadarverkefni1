const express = require('express');
const dataHandler = require('./lib/dataHandler.js');
const dataFetcher = require('./lib/dataFetcher.js');

const router = express.Router();
// const bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', dataFetcher.getAuthToken, dataHandler.getLocationByIP,
                dataFetcher.searchEvents, dataHandler.setFBEvents,
                dataHandler.filterEvents, (req, res, next) => {
                  const title = 'Heimasíðan okkar';

                  const dummyEvent = {
                    id: '342226739463992',
                    name: 'Icelandic Sagas: The Greatest Hits in 75 minutes',
                    type: 'public',
                    coverPicture: 'https://scontent.xx.fbcdn.net/t31.0-8/s720x720/14882236_10154078546450172_4053730819466321315_o.jpg',
                    profilePicture: 'https://scontent.xx.fbcdn.net/t31.0-0/c405.0.200.200/p200x200/14882236_10154078546450172_4053730819466321315_o.jpg',
                    description: 'Sýningin Icelandic Sagas: The Greatest Hits in 75 minutes í Hörpu verður haldin til stuðnings Íslandsdeildar Amnesty International\n12. nóvember næstkomandi. Allir listamennirnir gefa vinnu sína og rennur ágóðinn til Íslandsdeildar Amnesty International. Aðstandendur leikverksins ákváðu að standa að sérstakri uppfærslu á sýningunni til stuðnings Íslandsdeildar Amnesty International í baráttunni fyrir málefnum flóttafólks. \nÍ sýningunni kynna tveir af frambærislegustu leikurum þjóðarinnar brot af því besta úr Íslendingasögunum á 75 mínútum, sögur sem gengið hafa mann fram af manni og varðveist á skinnhandritum. Sýningin fer fram á ensku. \nSýndingardagur: Laugardagurinn 12. nóvember\nTími: 16:00\nVerð: 4900 kr.',
                    distance: '527',
                    startTime: '2016-11-12T16:00:00+0000',
                    endTime: '2016-11-12T17:15:00+0000',
                    timeFromNow: 514336,
                    category: null,
                    stats: { attending: 6, declined: 0, maybe: 13, noreply: 780 },
                    venue:
                    { id: '55649180171',
                      name: 'Íslandsdeild Amnesty International',
                      about: 'Amnesty International er alþjóðleg hreyfing fólks sem berst fyrir því að allir fái að njóta alþjóðlegra viðurkenndra mannréttinda. Félagar AI sameinast í baráttu fyrir betri heim.',
                      emails: null,
                      coverPicture: 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/14729148_10154058588450172_8321547701220451985_n.jpg?oh=5ba8f3034e5d9819d82feda124a5b6f5&oe=58870C80',
                      profilePicture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/14233023_10153929693455172_3126659564305361880_n.jpg?oh=03d9ddab4e08eb6ff5214f82394901bf&oe=58C834C8',
                      location:
                      { city: 'Reykjavík',
                        country: 'Iceland',
                        latitude: 64.14436,
                        longitude: -21.93607,
                        street: 'Þingholtsstræti 27',
                        zip: '101',
                      },
                    },
                  };
                  const events = res.locals.events;

                  const data = { title, events };
                  res.render('index', data);
                });

router.post('/', (req, res, next) => {
  const title = 'Niðurstöður margföldunar';
  const data = { title };
  res.render('index', data);
});

router.post('/ip', (req, res, next) => {
  const title = 'Niðurstöður margföldunar';
  const data = { title };

  res.render('index', data);
});

module.exports = router;
