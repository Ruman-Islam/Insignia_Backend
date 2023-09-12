import { OAuth2Client } from "google-auth-library";
import httpStatus from "http-status";
import User from "../user/user.model.js";

function generateRandomUsername(firstName, lastName) {
  // Generate a random number or string
  const randomSuffix = Math.random().toString(36).substring(2, 5);

  // Combine the first name, last name, and random suffix
  const userId =
    firstName.toLowerCase() + lastName.toLowerCase() + randomSuffix;

  return userId;
}

const googleLogin = async (credential) => {
  const secretToken =
    "443826492964-nufd1n34duehop7jrbogfl57aehch6ub.apps.googleusercontent.com";
  const clientSecret = "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";
  const client = new OAuth2Client(secretToken, clientSecret);

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: secretToken,
  });
  const { payload } = ticket;

  if (payload) {
    const { picture, given_name, family_name, email, email_verified } = payload;
    if (!email_verified) {
      throw new ApiError(httpStatus.NOT_FOUND, "User is not verified");
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      // create jwt token
    } else {
      let userId;
      let isUserIdUnique = false;

      while (!isUserIdUnique) {
        userId = generateRandomUsername(given_name, family_name);
        const isUserExists = await User.findOne({ userId });

        if (!isUserExists) {
          isUserIdUnique = true;
        }
      }

      const user = await User.create({
        userId,
        userName: given_name + " " + family_name,
        email: email,
        avatar: picture,
      });
    }

    // Create access token
    //   const accessToken = jwtHelpers.createToken(
    //     { employeeId: id, role: role },
    //     config?.jwt?.secret,
    //     config?.jwt?.expires_in
    //   );

    //   // Create refresh token
    //   const refreshToken = jwtHelpers.createToken(
    //     { employeeId: id, role: role },
    //     config?.jwt?.refresh_secret,
    //     config?.jwt?.refresh_expires_in
    //   );

    //   userExist.password = undefined;

    //   return {
    //     ...userExist.toObject(),
    //     accessToken,
    //     refreshToken
    //   };
  }
};

export const AuthService = {
  googleLogin,
};
