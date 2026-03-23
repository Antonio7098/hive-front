import { ErrorSeverity } from '../types/errors';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
}

const currentLevel = LogLevel.INFO;

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  levelName: string;
  message: string;
  context?: Record<string, unknown>;
  error?: {
    code: string;
    category: string;
    severity: string;
    message: string;
  };
}

function formatLogEntry(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.levelName}]`,
    entry.message,
  ];

  if (entry.context) {
    parts.push(JSON.stringify(entry.context));
  }

  if (entry.error) {
    parts.push(`Error: ${entry.error.code} - ${entry.error.message}`);
  }

  return parts.join(' ');
}

function createLogEntry(
  level: LogLevel,
  levelName: string,
  message: string,
  context?: Record<string, unknown>,
  error?: { code: string; category: string; severity: string; message: string }
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    levelName,
    message,
    context,
    error,
  };
}

function shouldLog(level: LogLevel): boolean {
  return level >= currentLevel;
}

export const structuredLogger = {
  debug(message: string, context?: Record<string, unknown>): void {
    if (!shouldLog(LogLevel.DEBUG)) return;
    const entry = createLogEntry(LogLevel.DEBUG, 'DEBUG', message, context);
    console.debug(formatLogEntry(entry));
  },

  info(message: string, context?: Record<string, unknown>): void {
    if (!shouldLog(LogLevel.INFO)) return;
    const entry = createLogEntry(LogLevel.INFO, 'INFO', message, context);
    console.info(formatLogEntry(entry));
  },

  warn(message: string, context?: Record<string, unknown>): void {
    if (!shouldLog(LogLevel.WARN)) return;
    const entry = createLogEntry(LogLevel.WARN, 'WARN', message, context);
    console.warn(formatLogEntry(entry));
  },

  error(
    message: string,
    errorInfo?: {
      code: string;
      category: string;
      severity: ErrorSeverity;
      message: string;
    },
    context?: Record<string, unknown>
  ): void {
    if (!shouldLog(LogLevel.ERROR)) return;
    const entry = createLogEntry(
      LogLevel.ERROR,
      'ERROR',
      message,
      context,
      errorInfo
        ? {
            code: errorInfo.code,
            category: errorInfo.category,
            severity: errorInfo.severity,
            message: errorInfo.message,
          }
        : undefined
    );
    console.error(formatLogEntry(entry));
  },

  critical(
    message: string,
    errorInfo?: {
      code: string;
      category: string;
      severity: ErrorSeverity;
      message: string;
    },
    context?: Record<string, unknown>
  ): void {
    const entry = createLogEntry(
      LogLevel.CRITICAL,
      'CRITICAL',
      message,
      context,
      errorInfo
        ? {
            code: errorInfo.code,
            category: errorInfo.category,
            severity: errorInfo.severity,
            message: errorInfo.message,
          }
        : undefined
    );
    console.error(formatLogEntry(entry));
  },
};

export type { LogEntry };
