const { Console } = require("console");
const mongoose = require("mongoose");
const { title } = require("process");

mongoose.connect('mongodb://127.0.0.1:27017/test')
// to check if mongoose is connected option 1
    .then(() => {
        console.log("CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("UH OH!")
        console.log(err)
    })

//to check if mongoose is connected option 2
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (){
//     console.log("CONNECTION OPEN!")
// });


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
        //or you can set up a custom message
        // min: [0, 'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        },
        size: {
            type: String,
            enum: ['S', 'M', 'L']
        }
    }
});

const Product = mongoose.model('Product', productSchema);

// const bike = new Product({ name: 'Tire Pump', price: 19.50, categories: ['Cycling']})
// bike.save()
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("UH OH!")
//         console.log(err)
//     })


//if using findOneAndUpdate, use the options- runValidators ex. 0 as value and then message
Product.findOneAndUpdate({ name: 'Tire Pump'}, { price: 9 }, { new: true, runValidators: true})
    .then(data => {
        console.log("IT WORKED!")
        console.log(data);
    })
    .catch(err => {
        console.log("UH OH!")
        console.log(err)
    })
