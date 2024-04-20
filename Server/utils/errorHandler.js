const errorHandler = (res, error) => {
    console.log("Api error", error);
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: {
            code: "SERVER_ERROR",
            description: "An unexpected error occurred on the server."
        }
    });
}

export default errorHandler;