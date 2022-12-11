const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const postSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 50 },
    description: {type: String, required: true, minlength: 5, maxlength: 50 },
    itemType: {type: String, required: true, minlength: 5, maxlength: 50 },
    quantaty: {type: Number, required: true, minlength: 1, maxlength: 99999},
    value: {type: Number, required: true, minlength: 1, maxlength: 99999},
});

const bioSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 50 },
    proPic: {type: String, required: true },
    text: {type: String, required: true, minlength: 1, maxlength: 1000},
    timeStamp: {type: Date, default: Date.now()},
})

const userSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true, minlength: 5, maxlength: 50 },
    email: {type : String, unique: true, required: true, minlength: 5, maxlength: 255 },
    password: { type: String, required: true, maxlength: 1024, minlength: 5 },
    posts: [{type: postSchema}],
    bio: [{type: bioSchema}],
    isAdmin: { type: Boolean, default: false },
});



userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, name: this.name, isAdmin: this.isAdmin }, config.get('jwtSecret'));
};

const User = mongoose.model('User',  userSchema);
const Post = mongoose.model('Post', postSchema);
const Bio = mongoose.model('Bio', bioSchema);

function validateUser(user) {
    const schema =Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}

function validatePost(post) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(50).required(),
        itemType: Joi.string().min(1).max(8).required(),
        value: Joi.number().min(1).max(99999).required(),
        quantaty: Joi.number().min(1).max(99999).required(),
    });
    return schema.validate(post);
}

function validateBio(bio) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        proPic: Joi.string().required(),
        text: Joi.string().min(1).max(1000).required(),
    });
    return schema.validate(bio);
}


exports.User = User;
exports.Post = Post;
exports.Bio = Bio;
exports.Reply = Reply;
exports.validateReply = validateReply;
exports.validateUser = validateUser;
exports.validatePost = validatePost;
exports.validateBio = validateBio;

