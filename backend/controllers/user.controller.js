// Simple test route
export const getHello = (req, res) => {
    res.json({
        message: "Hello from Express!"
    });
};