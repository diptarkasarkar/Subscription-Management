import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        minValue: [0, 'Price must be grater than 0'],
        maxValue: [10000, 'Price must be less than 0'],
    },
    currency: {
        type: String,
        enum: ['INR', 'JPY', 'EUR', 'USD'],
        default: 'INR',
    },
    frequency: {
        type: String,
        enum: ['weekly', 'monthly','quarterly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['Sports', 'News', 'Entertainment', 'Lifestyle', 'Other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Cancelled', 'Expired', 'Paused'],
        default: 'Active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start Date mut be today/in the past', 
        },
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value){
               return value > this.startDate;
            }, 
            message: 'Renewal Date mut be after the Start Date', 
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
},{timestamps: true});

subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            weekly: 7,
            monthly: 30,
            quarterly: 90,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //AutoUpdate the status if renewal date has passed: 
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    };
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;