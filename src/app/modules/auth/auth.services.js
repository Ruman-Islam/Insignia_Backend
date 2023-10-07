import { OAuth2Client } from "google-auth-library";
import User from "../user/user.model.js";
import config from "../../../config/index.js";
import ApiError from "../../../errors/ApiError.js";
import { generateUserId } from "./auth.utils.js";
import { jwtHelpers } from "../../../helper/jwtHelpers.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { sendForgotPasswordLink } from "../../../shared/nodeMailer.js";

const oAuth2Client = new OAuth2Client(
  config.google_client_id,
  config.google_client_secret,
  "postmessage"
);

const googleLogin = async (code) => {
  // Finding jwt token here from google
  const {
    tokens: {
      access_token,
      refresh_token,
      scope,
      token_type,
      id_token,
      expiry_date,
    },
  } = await oAuth2Client.getToken(code);

  // Collecting the user data from google
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: id_token,
    audience: config.google_client_id,
  });
  // ....................................

  const { payload } = ticket;
  const { picture, given_name, family_name, email, email_verified } = payload;

  // Google authenticating that user is verified or not
  if (!email_verified) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is not verified");
  }

  // Checking that is the user already exits or not in the database
  const isUserExists = await User.findOne({ email: payload.email });

  if (isUserExists) {
    // Create access token
    const accessToken = jwtHelpers.createToken(
      {
        role: isUserExists?.role,
        userId: isUserExists?.userId,
        email: isUserExists?.email,
      },
      config?.jwt?.secret,
      config?.jwt?.expires_in
    );

    // Create refresh token
    const refreshToken = jwtHelpers.createToken(
      {
        role: isUserExists?.role,
        userId: isUserExists?.userId,
        email: isUserExists?.email,
      },
      config?.jwt?.refresh_secret,
      config?.jwt?.refresh_expires_in
    );

    return {
      accessToken,
      refreshToken,
      user: isUserExists,
    };
  } else {
    // Creating account here because no email/user found in the database
    // Step 1: Generate unique user id
    const userId = await generateUserId();
    const createdUser = await User.create({
      userId,
      email: email,
      userName: given_name + " " + family_name,
      photoUrl: picture,
    });

    // Create access token
    const accessToken = jwtHelpers.createToken(
      {
        role: createdUser?.role,
        userId: createdUser?.userId,
        email: createdUser?.email,
      },
      config?.jwt?.secret,
      config?.jwt?.expires_in
    );

    // Create refresh token
    const refreshToken = jwtHelpers.createToken(
      {
        role: createdUser?.role,
        userId: createdUser?.userId,
        email: createdUser?.email,
      },
      config?.jwt?.refresh_secret,
      config?.jwt?.refresh_expires_in
    );

    return {
      accessToken,
      refreshToken,
      user: createdUser,
    };
  }
};

const register = async (payload) => {
  const isEmailExist = await User.findOne({ email: payload?.email });

  if (isEmailExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists with this email"
    );
  }

  const userId = await generateUserId();
  payload.userId = userId;

  const createdUser = await User.create(payload);

  if (!createdUser.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  // Remove the password
  createdUser.password = undefined;

  // Create access token
  const accessToken = jwtHelpers.createToken(
    {
      role: createdUser?.role,
      userId: createdUser?.userId,
      email: createdUser?.email,
    },
    config?.jwt?.secret,
    config?.jwt?.expires_in
  );

  // Create refresh token
  const refreshToken = jwtHelpers.createToken(
    {
      role: createdUser?.role,
      userId: createdUser?.userId,
      email: createdUser?.email,
    },
    config?.jwt?.refresh_secret,
    config?.jwt?.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
    createdUser,
  };
};

const login = async (payload) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  if (!isUserExist.password || !(await isUserExist.matchPassword(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect");
  }

  // Remove the password
  isUserExist.password = undefined;

  // Create access token
  const accessToken = jwtHelpers.createToken(
    {
      role: isUserExist?.role,
      userId: isUserExist?.userId,
      email: isUserExist?.email,
    },
    config?.jwt?.secret,
    config?.jwt?.expires_in
  );

  // Create refresh token
  const refreshToken = jwtHelpers.createToken(
    {
      role: isUserExist?.role,
      userId: isUserExist?.userId,
      email: isUserExist?.email,
    },
    config?.jwt?.refresh_secret,
    config?.jwt?.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
    user: isUserExist,
  };
};

const refreshToken = async (token) => {
  // verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config?.jwt?.refresh_secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  const { userId } = verifiedToken;
  // If the user already deleted then delete the refresh token
  const isUserExist = await User.findOne({ userId: userId });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  // Remove the password
  isUserExist.password = undefined;

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      role: isUserExist?.role,
      userId: isUserExist?.userId,
      email: isUserExist?.email,
    },
    config?.jwt?.secret,
    config?.jwt?.expires_in
  );

  return {
    accessToken: newAccessToken,
    user: isUserExist,
  };
};

const forgotPassword = async (payload) => {
  const { email } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  // Create access token
  const accessToken = jwtHelpers.createToken(
    {
      role: isUserExist?.role,
      userId: isUserExist?.userId,
      email: isUserExist?.email,
    },
    config?.jwt?.secret,
    config?.jwt?.email_expires_in
  );

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { resetToken: accessToken },
    { new: true }
  );

  if (updatedUser.resetToken) {
    await sendForgotPasswordLink(email, accessToken);
  } else {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

const resetPassword = async (payload) => {
  const { token, password } = payload;

  let verifiedUser = null;
  verifiedUser = jwtHelpers.verifiedToken(token, config?.jwt?.secret);

  if (verifiedUser) {
    const updatedUser = await User.findOneAndUpdate(
      { email: verifiedUser.email },
      {
        password: await bcrypt.hash(
          password,
          Number(config.bcrypt_salt_rounds)
        ),
      },
      { new: true }
    );

    if (updatedUser) {
      // Create access token
      const accessToken = jwtHelpers.createToken(
        {
          role: updatedUser?.role,
          userId: updatedUser?.userId,
          email: updatedUser?.email,
        },
        config?.jwt?.secret,
        config?.jwt?.expires_in
      );

      // Create refresh token
      const refreshToken = jwtHelpers.createToken(
        {
          role: updatedUser?.role,
          userId: updatedUser?.userId,
          email: updatedUser?.email,
        },
        config?.jwt?.refresh_secret,
        config?.jwt?.refresh_expires_in
      );

      updatedUser.password = undefined;
      return {
        accessToken,
        refreshToken,
        user: updatedUser,
      };
    } else {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }
};

export const AuthService = {
  register,
  login,
  googleLogin,
  refreshToken,
  forgotPassword,
  resetPassword,
};
