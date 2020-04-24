// Module dependencies
var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   Country = require('../models/country'),
   State = require('../models/state'),
   Settings = require('../models/settings'),
   util = require('util'),
   dbConfig = require('./configLoader').databaseConfig,
   connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
   connection = null;

var dbSeeder = function() {
    
    var init = function() {
        // mongoose.connect(connectionString);
        // connection = mongoose.connection;
        // mongoose.connection.on('open', function () {

        // });
        mongoose.connection.db.listCollections({name: 'countries'})
            .next(function(err, collinfo) {
                if (!collinfo) {
                    console.log('Starting dbSeeder...');
                    seed();
                }
            });
    },
    
    seed = function() {

        console.log('Seeding data....');


        Country.remove({});

        var country = new Customer({
            'name': 'Argentina'
            , 'GDP': 100000
            , 'GDPPerCapita': 1010
            , 'giniIndex' : 0.40
            , 'PPPIndex': 1000
        });

        //Settings
        Settings.remove({});
        var settings = new Settings ({ 'nextSeqNumber': 1, 'collectionName': "countries" });
        settings.save();



    };
    
    return {
        init: init,
        seed: seed
    }
}();

module.exports = dbSeeder;




