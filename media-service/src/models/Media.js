const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
    {
        publicId: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
        mimeType: { // e.g. image/jpeg, image/png, image/webp, image/gif, etc.
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);
const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;