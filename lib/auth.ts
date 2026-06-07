
import jwt from "jsonwebtoken";

const SECRET = "ambient-secret-key";

export function createToken(email: string) {
  return jwt.sign(
    { email },
    SECRET,
    { expiresIn: "1h" }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    return null;
  }
}