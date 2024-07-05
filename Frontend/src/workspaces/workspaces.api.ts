import { ApiWorkspace } from "../types/workspace";
import { callRequest, RequestFunction } from "../utils/api";

const subPathUrl = "workspaces/";

//* LoadWorkspace

interface ResponseLoadWorkspace {
  workspace: ApiWorkspace;
}

const loadWorkspace: RequestFunction<number, ApiWorkspace> = (id: number) =>
  callRequest(subPathUrl + id, "GET")
    .then((res: ResponseLoadWorkspace) => {
      return res.workspace;
    })
    .catch((err) => {
      console.error("WorkspacesAPI", "loadWorkspace", err);
      throw err;
    });

//* LoadAllWorkspace

interface ResponseLoadAllWorkspace {
  workspaces: ApiWorkspace[];
}

const loadAllWorkspace: RequestFunction<object, ApiWorkspace[]> = () =>
  callRequest(subPathUrl, "GET")
    .then((res: ResponseLoadAllWorkspace) => {
      return res.workspaces;
    })
    .catch((err) => {
      console.error("WorkspacesAPI", "loadAllWorkspace", err);
      throw err;
    });

//* CreateWorkspace

interface RequestCreateWorkspace {
  name: string;
  description: string;
}

interface ResponseCreateWorkspace {
  workspace: ApiWorkspace;
}

const createWorkspace: RequestFunction<RequestCreateWorkspace, ApiWorkspace> = (
  body
) =>
  callRequest(subPathUrl, "POST", body)
    .then((res: ResponseCreateWorkspace) => {
      return res.workspace;
    })
    .catch((err) => {
      console.error("WorkspacesAPI", "createWorkspace", err);
      throw err;
    });

export const WorkspacesAPI = {
  loadWorkspace,
  loadAllWorkspace,
  createWorkspace,
};
