import { AxiosError, HttpStatusCode } from "axios";
import { ZodIssueBase, ZodIssueOptionalMessage } from "zod";

declare const ZodHttpIssueCode: {
  unique_constraint: "unique_constraint";
  invalid_credentials: "invalid_credentials";
  not_found: "not_found";
};

type ZodHttpIssueCode = keyof typeof ZodHttpIssueCode;

export interface ZodUniqueIssue extends ZodIssueBase {
  code: typeof ZodHttpIssueCode.unique_constraint;
}

export interface ZodInvalidCredentialsIssue extends ZodIssueBase {
  code: typeof ZodHttpIssueCode.invalid_credentials;
}

export interface ZodNotFoundIssue extends ZodIssueBase {
  code: typeof ZodHttpIssueCode.not_found;
}

type ZodHttpIssueOptionalMessage =
  | ZodIssueOptionalMessage
  | ZodUniqueIssue
  | ZodInvalidCredentialsIssue
  | ZodNotFoundIssue;

type ZodHttpIssue = ZodHttpIssueOptionalMessage & {
  fatal?: boolean;
  message: string;
};

type ErrorResponse = {
  statusCode: HttpStatusCode;
  message: string;
  errors: ZodHttpIssue[];
};

export function ErrorResponseHandler(error: AxiosError): ErrorResponse {
  const { response, request } = error;
  if (response) {
    // client received an error response (5xx, 4xx)
    if (response.status >= 400 && response.status < 500) {
      return response.data as ErrorResponse;
    }

    return {
      statusCode: 500,
      message: "Something went wrong",
      errors: [],
    };
  }

  if (request) {
    // client never received a response, or request never left
    return {
      statusCode: 500,
      message: "Something went wrong",
      errors: [],
    };
  }

  // anything else
  return {
    statusCode: 500,
    message: String(error),
    errors: [],
  };
}
