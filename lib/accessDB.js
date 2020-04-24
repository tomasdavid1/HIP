// Module dependencies

var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Country = require('../models/country'),
    State = require('../models/state'),
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;

module.exports = {
    // Define class variable
    myEventID: null,

    // initialize DB
    startup: function (callback) {
        mongoose.connect(connectionString, { useMongoClient: true });
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;
        mongoose.connection.on('open', function () {
            console.log('We have connected to mongodb');
            callback();
        });

    },

    // disconnect from database
    close: function () {
        connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    },

    // get all the countries
    getCountries: function (skip, top, callback) {
        console.log('*** accessDB.getCountries');
        Country.count(function(err, custsCount) {
            var count = custsCount;
            console.log('Countries count: ' + count);

            Country.find({})
                /*
                //This stopped working (not sure if it's a mongo or mongoose change) so doing 2 queries now
                function (err, Countries) {
                    console.log('Countries count: ' + Countries.length);
                    count = Countries.length;
                })*/
            .skip(skip)
            .limit(top)
            .exec(function (err, countries) {
                callback(null, {
                    count: count,
                    countries: countries
                });
            });

        });
    },

    // get the customer summary
    getCountriesSummary: function (skip, top, callback) {
        console.log('*** accessDB.getCountriesSummary');
        Country.count(function(err, countriesCount) {
            var count = countriesCount;
            console.log('Countries count: ' + count);

            Country.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'orderCount': 1, 'gender': 1, 'id': 1 })
            /*
            //This stopped working (not sure if it's a mongo or mongoose change) so doing 2 queries now
            function (err, CountriesSummary) {
                console.log('Countries Summary count: ' + CountriesSummary.length);
                count = CountriesSummary.length;
            })
            */
            .skip(skip)
            .limit(top)
            .exec(function (err, countriesSummary) {
                callback(null, {
                    count: count,
                    countriesSummary: countriesSummary
                });
            });

        });
    },

    // get a  Country
    getCountry: function (id, callback) {
        console.log('*** accessDB.getCountry');
        Country.find({ 'id': id }, {}, function (err, country) {
            callback(null, country[0]);
        });
    },

    // insert a  Country
    insertCountry: function (req_body, state, callback) {
        console.log('*** accessDB.insertCountry');

        var country = new Country();
        var s = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        country.name = req_body.name;
        country.GDP = req_body.GDP;
        country.GDPPerCapita = req_body.emGDPPerCapitaail;
        country.giniIndex = req_body.giniIndex;
        country.PPPIndex = req_body.PPPIndex;
        country.state = s;
        country.id = 1; // The id is calculated by the Mongoose pre 'save'.

        country.save(function (err, country) {
            if (err) { console.log('*** new country save err: ' + err); return callback(err); }

            callback(null, country.id);
        });
    },

    editCountry: function (id, req_body, state, callback) {
        console.log('*** accessDB.editCountry');

        var s = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        Country.findOne({ 'id': id }, { '_id': 1, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'stateId': 1, 'gender': 1, 'id': 1 }, function (err, country) {
            if (err) { return callback(err); }

            country.name = req_body.name || country.name;
            country.GDP = req_body.GDP  || country.GDP ;
            country.GDPPerCapita = req_body.emGDPPerCapitaail || country.GDPPerCapita ;
            country.giniIndex = req_body.giniIndex || country.giniIndex ;
            country.PPPIndex = req_body.PPPIndex || country.PPPIndex ;
            country.state = s;
            country.id = 1;


            country.save(function (err) {
                if (err) { console.log('*** accessDB.editCountry err: ' + err); return callback(err); }

                callback(null);
            });

        });
    },

    // delete a country
    deleteCountry: function (id, callback) {
        console.log('*** accessDB.deleteCountry');
        Country.remove({ 'id': id }, function (err, country) {
            callback(null);
        });
    },

    // get a  country's name
    checkUnique: function (id, property, value, callback) {
        console.log('*** accessDB.checkUnique');
        console.log(id + ' ' + value)
        switch (property) {
            case 'email':
                Country.findOne({ 'name': value, 'id': { $ne: id} })
                        .select('name')
                        .exec(function (err, country) {
                            console.log(country)
                            var status = (country) ? false : true;
                            callback(null, {status: status});
                        });
                break;
        }

    },

    // get all the states
    getStates: function (callback) {
        console.log('*** accessDB.getStates');
        State.find({}, {}, { sort: { name: 1 } }, function (err, states) {
            callback(null, states);
        });
    },

    // get a state
    getState: function (stateId, callback) {
        console.log('*** accessDB.getState');
        State.find({ 'id': stateId }, {}, function (err, state) {
            callback(null, state);
        });
    }


}
