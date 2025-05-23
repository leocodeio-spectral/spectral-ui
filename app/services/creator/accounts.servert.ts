import { makeApiRequest } from "../common.server";

const creatorEndpoints = {
  getLinkedAccounts: { url: "/accounts/linked", method: "GET" },
  getLinkAccountUrl: { url: "/accounts/link", method: "GET" },
  linkAccount: { url: "/accounts/link", method: "POST" },
  unlinkAccount: { url: "/accounts/unlink", method: "POST" },
};

// start ------------------------------ getLinkedAccounts ------------------------------
export const getLinkedAccounts = async (request: Request) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.getLinkedAccounts.url,
    {
      method: creatorEndpoints.getLinkedAccounts.method,
      request: request,
    }
  );
  return response?.json();
};
// end ------------------------------ getLinkedAccounts ------------------------------
// start ------------------------------ getLinkAccountUrl ------------------------------
export const getLinkAccountUrl = async (request: Request) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.getLinkAccountUrl.url,
    {
      method: creatorEndpoints.getLinkAccountUrl.method,
      request: request,
    }
  );
  return response?.json();
};
// end ------------------------------ getLinkAccountUrl ------------------------------
// start ------------------------------ linkAccount ------------------------------
export const linkAccount = async (request: Request) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.linkAccount.url,
    {
      method: creatorEndpoints.linkAccount.method,
      request: request,
    }
  );
  return response?.json();
};
// end ------------------------------ linkAccount ------------------------------
// start ------------------------------ unlinkAccount ------------------------------
export const unlinkAccount = async (request: Request) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.unlinkAccount.url,
    {
      method: creatorEndpoints.unlinkAccount.method,
      request: request,
    }
  );
  return response?.json();
};
// end ------------------------------ unlinkAccount ------------------------------
