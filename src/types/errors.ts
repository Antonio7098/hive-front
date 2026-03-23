export enum ErrorCategory {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
}

export enum ErrorSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface ErrorCode {
  code: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  message: string;
  httpStatus?: number;
}

export const ErrorTaxonomy: Record<string, ErrorCode> = {
  // Network Errors (0 - Connection issues)
  NETWORK_CONNECTION_FAILED: {
    code: 'NETWORK_CONNECTION_FAILED',
    category: ErrorCategory.NETWORK,
    severity: ErrorSeverity.HIGH,
    message: 'Failed to connect to server',
    httpStatus: 0,
  },
  NETWORK_TIMEOUT: {
    code: 'NETWORK_TIMEOUT',
    category: ErrorCategory.NETWORK,
    severity: ErrorSeverity.MEDIUM,
    message: 'Request timed out',
    httpStatus: 0,
  },
  NETWORK_ABORTED: {
    code: 'NETWORK_ABORTED',
    category: ErrorCategory.NETWORK,
    severity: ErrorSeverity.LOW,
    message: 'Request was aborted',
    httpStatus: 0,
  },

  // API Errors (1xx - API specific)
  API_REQUEST_FAILED: {
    code: 'API_REQUEST_FAILED',
    category: ErrorCategory.API,
    severity: ErrorSeverity.HIGH,
    message: 'API request failed',
  },
  API_RESPONSE_INVALID: {
    code: 'API_RESPONSE_INVALID',
    category: ErrorCategory.API,
    severity: ErrorSeverity.HIGH,
    message: 'Invalid API response format',
  },
  API_SUCCESS_FALSE: {
    code: 'API_SUCCESS_FALSE',
    category: ErrorCategory.API,
    severity: ErrorSeverity.MEDIUM,
    message: 'API returned success: false',
  },

  // Validation Errors (2xx - Data validation)
  VALIDATION_FAILED: {
    code: 'VALIDATION_FAILED',
    category: ErrorCategory.VALIDATION,
    severity: ErrorSeverity.MEDIUM,
    message: 'Data validation failed',
  },
  VALIDATION_TYPE_MISMATCH: {
    code: 'VALIDATION_TYPE_MISMATCH',
    category: ErrorCategory.VALIDATION,
    severity: ErrorSeverity.MEDIUM,
    message: 'Field type does not match expected type',
  },
  VALIDATION_MISSING_FIELD: {
    code: 'VALIDATION_MISSING_FIELD',
    category: ErrorCategory.VALIDATION,
    severity: ErrorSeverity.MEDIUM,
    message: 'Required field is missing',
  },

  // Not Found Errors (3xx - Resource not found)
  NOT_FOUND_PROJECT: {
    code: 'NOT_FOUND_PROJECT',
    category: ErrorCategory.NOT_FOUND,
    severity: ErrorSeverity.MEDIUM,
    message: 'Project not found',
    httpStatus: 404,
  },
  NOT_FOUND_WORKFLOW: {
    code: 'NOT_FOUND_WORKFLOW',
    category: ErrorCategory.NOT_FOUND,
    severity: ErrorSeverity.MEDIUM,
    message: 'Workflow not found',
    httpStatus: 404,
  },
  NOT_FOUND_TASK: {
    code: 'NOT_FOUND_TASK',
    category: ErrorCategory.NOT_FOUND,
    severity: ErrorSeverity.MEDIUM,
    message: 'Task not found',
    httpStatus: 404,
  },

  // Authentication Errors (4xx - Auth issues)
  AUTH_REQUIRED: {
    code: 'AUTH_REQUIRED',
    category: ErrorCategory.AUTHENTICATION,
    severity: ErrorSeverity.HIGH,
    message: 'Authentication required',
    httpStatus: 401,
  },
  AUTH_INVALID_TOKEN: {
    code: 'AUTH_INVALID_TOKEN',
    category: ErrorCategory.AUTHENTICATION,
    severity: ErrorSeverity.HIGH,
    message: 'Invalid or expired token',
    httpStatus: 401,
  },

  // Authorization Errors (5xx - Permission issues)
  AUTH_FORBIDDEN: {
    code: 'AUTH_FORBIDDEN',
    category: ErrorCategory.AUTHORIZATION,
    severity: ErrorSeverity.HIGH,
    message: 'Access denied',
    httpStatus: 403,
  },

  // Rate Limiting (6xx)
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_LIMIT_EXCEEDED',
    category: ErrorCategory.RATE_LIMIT,
    severity: ErrorSeverity.MEDIUM,
    message: 'Too many requests',
    httpStatus: 429,
  },

  // Server Errors (7xx - Server issues)
  SERVER_INTERNAL: {
    code: 'SERVER_INTERNAL',
    category: ErrorCategory.SERVER,
    severity: ErrorSeverity.CRITICAL,
    message: 'Internal server error',
    httpStatus: 500,
  },
  SERVER_UNAVAILABLE: {
    code: 'SERVER_UNAVAILABLE',
    category: ErrorCategory.SERVER,
    severity: ErrorSeverity.CRITICAL,
    message: 'Server is unavailable',
    httpStatus: 503,
  },

  // Client Errors (8xx - Client misuse)
  CLIENT_INIT_FAILED: {
    code: 'CLIENT_INIT_FAILED',
    category: ErrorCategory.CLIENT,
    severity: ErrorSeverity.CRITICAL,
    message: 'Failed to initialize application',
  },
  CLIENT_INVALID_STATE: {
    code: 'CLIENT_INVALID_STATE',
    category: ErrorCategory.CLIENT,
    severity: ErrorSeverity.HIGH,
    message: 'Invalid application state',
  },
  CLIENT_CREATE_FAILED: {
    code: 'CLIENT_CREATE_FAILED',
    category: ErrorCategory.CLIENT,
    severity: ErrorSeverity.HIGH,
    message: 'Failed to create resource',
  },

  // Unknown Errors (9xx)
  UNKNOWN: {
    code: 'UNKNOWN',
    category: ErrorCategory.UNKNOWN,
    severity: ErrorSeverity.MEDIUM,
    message: 'An unknown error occurred',
  },
};

export function getErrorTaxonomy(httpStatus: number | undefined, _apiCode?: string): ErrorCode {
  if (!httpStatus || httpStatus === 0) {
    return ErrorTaxonomy.NETWORK_CONNECTION_FAILED;
  }

  if (httpStatus === 401) {
    return ErrorTaxonomy.AUTH_INVALID_TOKEN;
  }
  if (httpStatus === 403) {
    return ErrorTaxonomy.AUTH_FORBIDDEN;
  }
  if (httpStatus === 404) {
    return ErrorTaxonomy.NOT_FOUND_PROJECT;
  }
  if (httpStatus === 429) {
    return ErrorTaxonomy.RATE_LIMIT_EXCEEDED;
  }
  if (httpStatus >= 500) {
    return ErrorTaxonomy.SERVER_INTERNAL;
  }

  return ErrorTaxonomy.UNKNOWN;
}
