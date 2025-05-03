import prisma from "#app-auth/server/prisma";
import type {
  LoginAccountDTO,
  RegisterAccountDTO,
} from "#app-auth/server/dtos/auth.dto";

export async function registerAccount(dto: RegisterAccountDTO) {
  return prisma.$transaction(async (db) => {
    const existingUser = await db.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    });
    if (existingUser) {
      throw new Error("User already exists with this email or username.");
    }

    const hashedPassword = await hashPassword(dto.password);
    const user = await db.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    const [accessToken, refreshToken] = await Promise.all([
      signJwt({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      }),
      signJwt({ userId: user.id }, { expiresIn: "7d" }),
    ]);

    // save session token to db
    await db.session.create({
      data: {
        userId: user.id,
        expiresAtAccess: new Date(Date.now() + 1000 * 60 * 60), // 60 minutes
        expiresAtRefresh: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        accessToken,
        refreshToken,
      },
    });

    const { password, ...rest } = user;

    return {
      ...rest,
      accessToken,
      refreshToken,
    };
  });
}
export async function loginAccount(dto: LoginAccountDTO) {
  return prisma.$transaction(async (db) => {
    const existingUser = await db.user.findFirst({
      where: { OR: [{ email: dto.username }, { username: dto.username }] },
    });

    if (!existingUser) {
      throw createError({
        statusCode: 404, // 404 Not Found
        statusMessage: "User not found",
        message: "User not found",
      });
    }

    const comparedPassword = await comparePassword(
      dto.password,
      existingUser.password
    );

    if (!comparedPassword) {
      throw createError({
        statusCode: 401, // 401 Unauthorized
        statusMessage: "Invalid password",
        message: "Invalid password",
      });
    }

    // Generate JWT tokens
    const [accessToken, refreshToken] = await Promise.all([
      signJwt({
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        role: existingUser.role,
      }),
      signJwt({ userId: existingUser.id }, { expiresIn: "7d" }),
    ]);

    // save session token to db
    await db.session.create({
      data: {
        userId: existingUser.id,
        expiresAtAccess: new Date(Date.now() + 1000 * 60 * 60), // 60 minutes
        expiresAtRefresh: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        accessToken,
        refreshToken,
      },
    });

    const { password, ...rest } = existingUser;

    return {
      ...rest,
      accessToken,
      refreshToken,
    };
  });
}
