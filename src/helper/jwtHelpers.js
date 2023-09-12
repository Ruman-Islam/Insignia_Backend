import jwt from "jsonwebtoken";

const createToken = (payload, secret, expiresTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresTime,
  });
};

const verifiedToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const jwtHelpers = {
  createToken,
  verifiedToken,
};
