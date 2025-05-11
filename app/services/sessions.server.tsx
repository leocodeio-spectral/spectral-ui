import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";
import { jwtDecode } from "jwt-decode";
import { validateAccessToken } from "./verfication.server";

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production";

// ------------------------------ theme session storage ------------------------------
const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    secure: false,
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);

// ------------------------------ i18n session storage ------------------------------
const i18nSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "i18n",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    secure: false,
  },
});

export async function getI18nSession(request: Request) {
  const session = await i18nSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return {
    getLocale: () => session.get("locale") || "en",
    setLocale: (locale: string) => session.set("locale", locale),
    commitI18nSession: () => i18nSessionStorage.commitSession(session),
  };
}

// ------------------------------ user session storage ------------------------------

const userSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "user",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    secure: false,
    isSigned: true,
  },
});

export async function userSession(request: Request) {
  const session = await userSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return {
    getRole: () => session.get("role"),
    getIsRole: (roles: string[]): boolean => {
      const user = session.get("user");
      if (user) {
        const { role } = jwtDecode(user.accessToken) as {
          role: string;
          any: any;
        };
        if (roles.length === 0) {
          return true;
        }
        if (roles.includes(role)) {
          return true;
        }
        return false;
      }
      return false;
    },
    isAuthenticated: async () => {
      const accessToken = session.get("accessToken");
      const role = session.get("role");
      if (accessToken && role) {
        const result = await validateAccessToken(role, accessToken, request);
        if (result.success) {
          return result.data.valid;
        }
        return false;
      }
      return false;
    },
    setUser: (accessToken: string, refreshToken: string, role: string) => {
      session.set("accessToken", accessToken);
      session.set("refreshToken", refreshToken);
      session.set("role", role);
    },
    getUser: () => {
      return {
        accessToken: session.get("accessToken"),
        refreshToken: session.get("refreshToken"),
        role: session.get("role"),
      };
    },
    getAcessAndRefreshToken: () => {
      return {
        accessToken: session.get("accessToken"),
        refreshToken: session.get("refreshToken"),
      };
    },
    removeUser: () => userSessionStorage.destroySession(session),
    commitSession: () => userSessionStorage.commitSession(session),
  };
}
