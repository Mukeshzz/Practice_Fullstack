import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = await req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Invalid Token", error);
  }
};

export { auth };
