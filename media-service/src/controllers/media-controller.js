const Media = require("../models/Media");
const { uploadMediaToCloudinary } = require("../utils/cloudinary");
const logger = require("../utils/logger");

const uploadMedia = async (req, res) => {
    logger.info("Media upload starting...");
    try {
        //console.log(req.file, "req.filereq.file");

        if (!req.file) {
            logger.error("File not found. Please add a file and try again.");
            return res.status(400).json({
                success: false,
                message: "No file found. Please add a file and try again!",
            });
        }

        const { originalname, mimetype, buffer } = req.file; // These var name must match with the req.file data name
        const userId = req.user.userId;

        logger.info(`File details: name=${originalname}, type=${mimetype}`);
        logger.info("Uploading to cloudinary starting...");

        const cloudinaryUploadResult = await uploadMediaToCloudinary(req.file);
        logger.info(
            `Cloudinary upload successfully. Public Id: - ${cloudinaryUploadResult.public_id}`
        );

        const newlyCreatedMedia = new Media({
            publicId: cloudinaryUploadResult.public_id,
            originalName: originalname,
            mimeType: mimetype,
            url: cloudinaryUploadResult.secure_url,
            userId,
        });

        await newlyCreatedMedia.save();

        res.status(201).json({
            success: true,
            mediaId: newlyCreatedMedia._id,
            url: newlyCreatedMedia.url,
            message: "Media uploaded successfully!",
        });
    } catch (error) {
        logger.error("Error creating media", error);
        res.status(500).json({
            success: false,
            message: "Failed to create media",
        });
    }
};

// Optional: just for testing media deletion result
const getAllMedia = async (req, res) => {
    try {
        const result = await Media.find({ userId: req.user.userId });

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Can not find any media for this user"
            })
        }
        return res.status(200).json({
            result
        });
    } catch (e) {
        logger.error("Error fetching media", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch media",
        });
    }
};

module.exports = { uploadMedia, getAllMedia };