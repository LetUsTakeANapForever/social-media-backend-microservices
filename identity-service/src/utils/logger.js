const winston = require("winston");

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(), // do string interpolation format like `hello ${name} -> hello David`
        winston.format.json()
    ),
    defaultMeta: { service: "identity-service" },
    transports: [ // where to store logs
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({ filename: "error.log", level: "error" }), // This is a file for error logs. P.S.level is like a label of severity
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

module.exports = logger;