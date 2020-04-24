//import {ICountry} from "../app/shared/interfaces";


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Settings = require('./settings');


var OrderSchema = new Schema({
    product: {
        type: String, required: true, trim: true
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    }
});


var CountrySchema = new Schema({

        GPD: {
            type: Number, required: true
        },
        state: {
            id: {
                type: Number
            },
            abbreviation: {
                type: String, required: true, trim: true
            },
            name: {
                type: String, required: true, trim: true
            }
        },
        GDPPerCapita: {
            type: Number, required: true
        },
        id: {
            type: Number, required: true, unique: true
        },
        PPPIndex: {
            type: Number, required: true, unique: true
        },
        publicDebt: {
            type: Number, required: true, unique: true
        },
        giniIndex: {
            type: Number, required: true, unique: true
        },

});
//
// var CustomerSchema = new Schema({
//     firstName: {
//         type: String, required: true, trim: true
//     },
//     lastName: {
//         type: String, required: true, trim: true
//     },
//     email: {
//         type: String, required: true, trim: true
//     },
//     address: {
//         type: String, required: true, trim: true
//     },
//     city: {
//         type: String, required: true, trim: true
//     },
//     stateId: {
//         type: Number, required: true
//     },
//     state: {
//         id: {
//             type: Number
//         },
//         abbreviation: {
//             type: String, required: true, trim: true
//         },
//         name: {
//             type: String, required: true, trim: true
//         }
//     },
//     zip: {
//         type: Number, required: true
//     },
//     gender: {
//         type: String,
//     },
//     id: {
//         type: Number, required: true, unique: true
//     },
//     orderCount: {
//         type: Number,
//     },
//     orders: [OrderSchema],
// });

CountrySchema.index({id: 1, type: 1}); // schema level

//
// CustomerSchema.pre('save', function (next) {
//     var doc = this;
//     // Calculate the next id on new Customers only.
//     if (this.isNew) {
//         Settings.findOneAndUpdate({"collectionName": "countries"}, {$inc: {nextSeqNumber: 1}}, function (err, settings) {
//             if (err) next(err);
//             doc.id = settings.nextSeqNumber - 1; // substract 1 because I need the 'current' sequence number, not the next
//             next();
//         });
//     } else {
//         next();
//     }
// });


CountrySchema.pre('save', function (next) {
    var doc = this;
    if (this.isNew) {
        Settings.findOneAndUpdate({"collectionName": "customers"}, {$inc: {nextSeqNumber: 1}}, function (err, settings) {
            if (err) next(err);
            doc.id = settings.nextSeqNumber - 1; // substract 1 because I need the 'current' sequence number, not the next
            next();
        });
    } else {
        next();
    }
});


//exports.CustomerSchema = CustomerSchema;
exports.CountrySchema = CountrySchema;
//module.exports = mongoose.model('Customer', CustomerSchema, 'countries');
module.exports = mongoose.model('Country', CountrySchema, 'countries');
