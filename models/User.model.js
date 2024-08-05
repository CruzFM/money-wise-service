const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const validateEmail = function (email) {
    // Expresión regular para validar una dirección de correo electrónico
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};


const UserSchema = Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true
    }
);
const User = model('User', UserSchema);
module.exports = User;