import prisma from "#app-auth/server/prisma";
import type { LoginDTO, RegisterDTO } from "#app-auth/server/dtos/auth.dto";

export async function register(dto: RegisterDTO) {
  return prisma.$transaction(async (db) => {
    const existingUser = await db.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    });
    if (existingUser) {
      throw createError({
        statusCode: 409, // 409 Conflict
        statusMessage: "User already exists with this email or username.",
        message: "User already exists with this email or username.",
      });
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
      }),
      signJwt({ userId: user.id }, { expiresIn: "7d" }),
    ]);

    // Verify JWT tokens to get expiration times
    const [expiresAtAccess, expiresAtRefresh] = await Promise.all([
      verifyJwt(accessToken),
      verifyJwt(refreshToken),
    ]);

    // save session token to db
    await db.session.create({
      data: {
        userId: user.id,
        expiresAtAccess: (expiresAtAccess.payload.exp || 0) * 1000,
        expiresAtRefresh: (expiresAtRefresh.payload.exp || 0) * 1000,
        accessToken,
        refreshToken,
      },
    });

    const { password, ...rest } = user;

    return {
      ...rest,
      accessToken,
      refreshToken,
      expiresAtAccess: (expiresAtAccess.payload.exp || 0) * 1000,
      expiresAtRefresh: (expiresAtRefresh.payload.exp || 0) * 1000,
    };
  });
}
export async function login(dto: LoginDTO) {
  return prisma.$transaction(async (db) => {
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: dto.identifier }, { username: dto.identifier }],
      },
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
      }),
      signJwt({ userId: existingUser.id }, { expiresIn: "7d" }),
    ]);

    // Verify JWT tokens to get expiration times
    const [expiresAtAccess, expiresAtRefresh] = await Promise.all([
      verifyJwt(accessToken),
      verifyJwt(refreshToken),
    ]);
    // save session token to db
    await db.session.create({
      data: {
        userId: existingUser.id,
        expiresAtAccess: (expiresAtAccess.payload.exp || 0) * 1000,
        expiresAtRefresh: (expiresAtRefresh.payload.exp || 0) * 1000,
        accessToken,
        refreshToken,
      },
    });

    const { password, ...rest } = existingUser;

    return {
      ...rest,
      accessToken,
      refreshToken,
      expiresAtAccess: (expiresAtAccess.payload.exp || 0) * 1000,
      expiresAtRefresh: (expiresAtRefresh.payload.exp || 0) * 1000,
    };
  });
}

export async function logout(userId: string) {
  return prisma.$transaction(async (db) => {
    const session = await db.session.findFirst({
      where: { userId },
    });

    if (!session) {
      throw createError({
        statusCode: 404, // 404 Not Found
        statusMessage: "Session not found",
        message: "Session not found",
      });
    }

    await db.session.delete({
      where: { id: session.id },
    });
  });
}
