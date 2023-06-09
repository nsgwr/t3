import {
  AttributeValue,
  PutItemCommandInput,
  QueryCommandInput,
  ScanCommandInput,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export const createGetProjectByIDInput = (
  projectId: string
): QueryCommandInput => {
  return {
    TableName: "project",
    KeyConditionExpression:
      "project_id = :project_id AND project_member_address = :project_member_address",
    ExpressionAttributeValues: {
      ":project_id": { S: projectId },
      ":project_member_address": { S: `PJ#${projectId}` },
    },
  };
};

export const createGetProjectMembersByIDInput = (
  projectId: string
): QueryCommandInput => {
  return {
    TableName: "project",
    KeyConditionExpression:
      "#project_id = :project_id AND begins_with(#project_member_address, :project_member_address)",
    ExpressionAttributeValues: {
      ":project_id": { S: projectId },
      ":project_member_address": { S: `USER#` },
    },
    ExpressionAttributeNames: {
      "#project_id": "project_id",
      "#project_member_address": "project_member_address",
    },
  };
};

export const getProjectsInput: QueryCommandInput = {
  TableName: "project",
  IndexName: "Type-CreatedAt-Index",
  ScanIndexForward: false,
  KeyConditionExpression: "#type = :type",
  ExpressionAttributeValues: {
    ":type": {
      S: "pj",
    },
  },
  ExpressionAttributeNames: {
    "#type": "type",
  },
};

export const getUsersInput = (): ScanCommandInput => {
  return {
    TableName: "user",
    Limit: 150,
  };
};

export const getCommentsByProjectIdInput = (
  projectId: string
): QueryCommandInput => {
  return {
    TableName: "comment",
    IndexName: "ProjectID-CreatedAt-Index",
    ScanIndexForward: true,
    KeyConditionExpression: "#project_id = :project_id",
    ExpressionAttributeValues: {
      ":project_id": {
        S: projectId,
      },
    },
    ExpressionAttributeNames: {
      "#project_id": "project_id",
    },
  };
};

export const postResultInput = (
  projectId: string,
  content: string
): UpdateItemCommandInput => {
  return {
    TableName: "project",
    Key: marshall({
      project_id: projectId,
      project_member_address: `PJ#${projectId}`,
    }),
    UpdateExpression: "set #result.#content = :content",
    ExpressionAttributeNames: {
      "#result": "result",
      "#content": "content",
    },
    ExpressionAttributeValues: {
      ":content": { S: content },
    },
  };
};

export const createCommentInput = (
  item: Record<string, AttributeValue>
): PutItemCommandInput => {
  return {
    TableName: "comment",
    Item: item,
  };
};
