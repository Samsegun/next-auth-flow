import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// not working in middleware but will probably work on api routes
export const checkTokenExpiration = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        const expirationTime = decodedToken.exp;
        const currentTime = new Date().getTime();

        if (expirationTime <= currentTime) {
            return true;
        }

        return false;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
