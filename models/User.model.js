const mongoose = require("mongoose");

const validateEmail = function (email) {
    // Expresión regular para validar una dirección de correo electrónico
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};


const UserSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: [validateEmail, "Please enter a valid email!"]
        },
        passwordHash:{
            type: String,
            required: true
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now
        // }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);