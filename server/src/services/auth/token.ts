import jwt from "jsonwebtoken";

type Payload = {
    id: number;
};

export async function verifyToken(token: string): Promise<Payload> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                reject(err);
            }

            resolve(decoded as Payload);
        });
    });
}

export async function signToken(payload: Payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            {
                expiresIn: "1y",
            },
            (err, token) => {
                if (err) {
                    reject(err);
                }

                resolve(token);
            }
        );
    });
}
