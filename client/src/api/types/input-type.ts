import { QueryCommandInput } from "@aws-sdk/client-dynamodb";

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
