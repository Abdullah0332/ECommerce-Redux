const mongoose =  require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please Enter Product Name'],
        trim: true,
        maxLength: [100, 'Product Name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        require: [true, 'Please Enter Product Price'],
        maxLength: [5, 'Price Name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        require: [true, 'Please Enter Product Description'],
    },
    ratings: {
        type: String,
        default:0,
    },
    images: [
        {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ],
    category: {
        type: String,
        require: [true, 'Please Select Category for this Product '],
        enum: {
            values : [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Heath',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        require: [true, 'Please Enter Product Seller']
    },
    stock: { 
        type: Number,
        require: [true, 'Please Enter Product Stock'],
        maxLength: [5, 'Product Name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                require: true
            },
            rating: {
                type: Number,
                require: true
            },
            comment: {
                type: String,
                require: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Product', productSchema)