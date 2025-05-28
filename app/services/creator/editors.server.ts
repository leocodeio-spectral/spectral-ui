import { ActionResult } from "~/types/action-result";
import { makeApiRequest } from "../common.server";
import { userSession } from "../sessions.server";

const creatorEndpoints = {
  searchEditor: {
    url: "/creator-editor-map/find-map/:creatorId/:email",
    method: "GET",
  },
  getEditors: {
    url: "/creator-editor-map/find-maps-by-creator",
    method: "GET",
  },
  connectEditor: { url: "/creator-editor-map/connect", method: "POST" },
};

// start ------------------------------ searchEditor ------------------------------
export const searchEditor = async (
  request: Request,
  email: string
): Promise<ActionResult<any>> => {
  const session = await userSession(request);
  const creatorId = session.getCurrentUserId();
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.searchEditor.url,
    {
      method: creatorEndpoints.searchEditor.method,
      request: request,
      pathParams: {
        creatorId: creatorId,
        email: email,
      },
    }
  );
  if (response?.status === 401 || response?.status === 403) {
    // 401
    return {
      success: false,
      origin: "email",
      message: "Failed to search editor due to invalid authorization",
      data: null,
    };
  } else if (response?.status === 404) {
    // 404
    return {
      success: false,
      origin: "email",
      message: "Editor not found",
      data: null,
    };
  } else if (response?.status === 400) {
    // 400
    return {
      success: false,
      origin: "email",
      message: "Failed to search editor due to invalid request",
      data: null,
    };
  } else if (response?.status === 500) {
    // 500
    return {
      success: false,
      origin: "email",
      message: "Failed to search editor due to backend server error",
      data: null,
    };
  }

  const data = await response?.json();
  const result: ActionResult<any> = {
    success: true,
    origin: "email",
    message: "Editor found",
    data: data,
  };
  return result;
};
// end ------------------------------ searchEditor ------------------------------
// start ------------------------------ connectEditor ------------------------------
export const connectEditor = async (request: Request, editorId: string) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.connectEditor.url,
    {
      method: creatorEndpoints.connectEditor.method,
      request: request,
      params: {
        editorId: editorId,
      },
    }
  );
  return response?.json();
};
// end ------------------------------ connectEditor ------------------------------
// start ------------------------------ getEditors ------------------------------
export const getEditors = async (request: Request, creatorId: string) => {
  const response = await makeApiRequest<any, any>(
    creatorEndpoints.getEditors.url,
    {
      method: creatorEndpoints.getEditors.method,
      request: request,
      params: {
        creatorId: creatorId,
      },
    }
  );
  return response?.json();
};
// end ------------------------------ getEditors ------------------------------
