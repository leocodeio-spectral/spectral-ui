import { makeApiRequest } from "../common.server";

const creatorEndpoints = {
  getLinkedAccounts: { url: "/youtube/creator", method: "GET" },
  getLinkAccountUrl: { url: "/youtube/api/auth", method: "GET" },
  linkAccount: { url: "/youtube/api/oauth2callback", method: "POST" },
  unlinkAccount: { url: "/accounts/unlink", method: "POST" },
};

// start ------------------------------ getLinkedAccounts ------------------------------
export const getLinkedAccounts = async (
  request: Request,
  creatorId: string
) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.getLinkedAccounts.url,
    {
      method: creatorEndpoints.getLinkedAccounts.method,
      request: request,
      params: {
        creatorId: creatorId,
        status: "active",
      },
    }
  );
  return await response?.json().then((data) => {
    // console.log("data", data);
    return data.data;
  });
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
export const linkAccount = async (
  request: Request,
  slugCallbackDataDto: SlugCallbackDataDto
) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.linkAccount.url,
    {
      method: creatorEndpoints.linkAccount.method,
      request: request,
      body: slugCallbackDataDto,
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

export interface SlugCallbackDataDto {
  code: string;
  creatorId: string;
}
