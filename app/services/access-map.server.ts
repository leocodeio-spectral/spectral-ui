import { Persona } from "../models/persona";

export type AccessMap = {
  [key in Persona]: {
    [key: string]: boolean;
  };
};

export const accessMap: AccessMap = {
  [Persona.CREATOR]: {
    "": true,
    "/home": true,
    "/feature/dashboard": true,
    "/feature/accounts": false,
  },
  [Persona.EDITOR]: {
    "": true,
    "/home": true,
    "/feature/dashboard": true,
  },
};
