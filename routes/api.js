var db = require('../lib/accessDB')
  , util = require('util');

// GET
//
// exports.customer = function (req, res) {
//     console.log('*** customer');
//
//     db.getCustomer(req.params.id, function (err, customer) {
//         if (err) {
//             console.log('*** customer err');
//             res.json({
//                 customer: customer
//             });
//         } else {
//             console.log('*** customer ok');
//             res.json(customer);
//         }
//     });
// };


exports.country = function (req, res) {
    console.log('retrieving country ');
    db.getCountry(req.params.id, function (err, customer) {
        if (err) {
            console.log(country ,'err');
            res.json({
                country: country
            });
        } else {
            console.log('*** customer ok');
            res.json(country);
        }
    });
};


exports.addCountry = function (req, res) {
    console.log('*** addCustomer');
    db.getState(req.body.stateId, function (err, state) {
        if (err) {
            console.log('*** getState err');
            res.json({ 'status': false });
        } else {
            db.insertCountry(req.body, state, function (err) {
                if (err) {
                    console.log('*** addCustomer err');
                    res.json(false);
                } else {
                    console.log('*** addCustomer ok');
                    res.json(req.body);
                }
            });
        }
    });
};

exports.editCountry = function (req, res) {
    console.log('*** editCustomer');
    console.log('*** req.body');
    console.log(req.body);

    if (!req.body || !req.body.stateId) {
        throw new Error('Customer and associated stateId required');
    }

    db.getState(req.body.stateId, function (err, state) {
        if (err) {
            console.log('*** getState err');
            res.json({ 'status': false });
        } else {
            db.editCountry(req.params.id, req.body, state, function (err) {
                if (err) {
                    console.log('*** editCountry err' + util.inspect(err));
                    res.json({ 'status': false });
                } else {
                    console.log('*** editCountry ok');
                    res.json({ 'status': true });
                }
            });
        }
    });
};

exports.deleteCountry = function (req, res) {
    console.log('*** deleteCustomer');

    db.deleteCountry(req.params.id, function (err) {
        if (err) {
            console.log('*** deleteCountry err');
            res.json({ 'status': false });
        } else {
            console.log('*** deleteCountry ok');
            res.json({ 'status': true });
        }
    });
};
// exports.addCustomer = function (req, res) {
//     console.log('*** addCustomer');
//     db.getState(req.body.stateId, function (err, state) {
//         if (err) {
//             console.log('*** getState err');
//             res.json({ 'status': false });
//         } else {
//             db.insertCustomer(req.body, state, function (err) {
//                 if (err) {
//                     console.log('*** addCustomer err');
//                     res.json(false);
//                 } else {
//                     console.log('*** addCustomer ok');
//                     res.json(req.body);
//                 }
//             });
//         }
//     });
// };
//
// exports.editCustomer = function (req, res) {
//     console.log('*** editCustomer');
//     console.log('*** req.body');
//     console.log(req.body);
//
//     if (!req.body || !req.body.stateId) {
//         throw new Error('Customer and associated stateId required');
//     }
//
//     db.getState(req.body.stateId, function (err, state) {
//         if (err) {
//             console.log('*** getState err');
//             res.json({ 'status': false });
//         } else {
//             db.editCustomer(req.params.id, req.body, state, function (err) {
//                 if (err) {
//                     console.log('*** editCustomer err' + util.inspect(err));
//                     res.json({ 'status': false });
//                 } else {
//                     console.log('*** editCustomer ok');
//                     res.json({ 'status': true });
//                 }
//             });
//         }
//     });
// };

// exports.deleteCustomer = function (req, res) {
//     console.log('*** deleteCustomer');
//
//     db.deleteCustomer(req.params.id, function (err) {
//         if (err) {
//             console.log('*** deleteCustomer err');
//             res.json({ 'status': false });
//         } else {
//             console.log('*** deleteCustomer ok');
//             res.json({ 'status': true });
//         }
//     });
// };

// GET
exports.states = function (req, res) {
    console.log('*** states');
    db.getStates(function (err, states) {
        if (err) {
            console.log('*** states err');
            res.json({
                states: states
            });
        } else {
            console.log('*** states ok');
            res.json(states);
        }
    });
};

exports.countries = function (req, res) {
    console.log('*** countries');
    var topVal = req.query.$top,
        skipVal = req.query.$skip,
        top = (isNaN(topVal)) ? 10 : parseInt(req.query.$top, 10),
        skip = (isNaN(skipVal)) ? 0 : parseInt(req.query.$skip, 10);

    db.getCountries(skip, top, function (err, data) {
        res.setHeader('X-InlineCount', data.count);
        if (err) {
            console.log('*** countries err');
            res.json({
                countries: data.countries
            });
        } else {

            console.log('*** countries ok');
            res.json(data.countries);
        }
    });
};
// exports.countries = function (req, res) {
//     console.log('*** countries');
//     var topVal = req.query.$top,
//         skipVal = req.query.$skip,
//         top = (isNaN(topVal)) ? 10 : parseInt(req.query.$top, 10),
//         skip = (isNaN(skipVal)) ? 0 : parseInt(req.query.$skip, 10);
//
//     db.getCustomers(skip, top, function (err, data) {
//         res.setHeader('X-InlineCount', data.count);
//         if (err) {
//             console.log('*** countries err');
//             res.json({
//                 countries: data.countries
//             });
//         } else {
//             console.log('*** countries ok');
//             res.json(data.countries);
//         }
//     });
// };

exports.countriesSummary = function (req, res) {
    console.log('*** customersSummary');
    var topVal = req.query.$top,
        skipVal = req.query.$skip,
        top = (isNaN(topVal)) ? 10 : parseInt(req.query.$top, 10),
        skip = (isNaN(skipVal)) ? 0 : parseInt(req.query.$skip, 10);

    db.getCountriesSummary(skip, top, function (err, summary) {
        res.setHeader('X-InlineCount', summary.count);
        if (err) {
            console.log('*** customersSummary err');
            res.json({
                customersSummary: summary.customersSummary
            });
        } else {
            console.log('*** customersSummary ok');
            res.json(summary.customersSummary);
        }
    });
};

exports.checkUnique = function (req, res) {
    console.log('*** checkUnique');

    var id = req.params.id,
    	value = req.query.value,
    	property = req.query.property;

    db.checkUnique(id, property, value, function (err, opStatus) {
        if (err) {
            console.log('*** checkUnique err');
            res.json({
                'status': false
            });
        } else {
            console.log('*** checkUnique ok');
            res.json(opStatus);
        }
    });
};

exports.login = function (req, res) {
    console.log('*** login');
    var userLogin = req.body.userLogin;
    var userName = userLogin.userName;
    var password = userLogin.password;

    //Simulate login
    res.json({ status: true });
};

exports.logout = function (req, res) {
    console.log('*** logout');

    //Simulate logout
    res.json({ status: true });
};





