/**
 * Logger utility for API requests and errors
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  message: string;
  level: LogLevel;
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Simple logger utility that writes to console but could be extended to write to a file or service
 */
class Logger {
  private logToConsole(entry: LogEntry): void {
    const formattedEntry = {
      timestamp: entry.timestamp,
      level: entry.level.toUpperCase(),
      message: entry.message,
      ...(entry.metadata ? { metadata: entry.metadata } : {})
    };

    switch (entry.level) {
      case 'info':
        console.info(JSON.stringify(formattedEntry));
        break;
      case 'warn':
        console.warn(JSON.stringify(formattedEntry));
        break;
      case 'error':
        console.error(JSON.stringify(formattedEntry));
        break;
      case 'debug':
        console.debug(JSON.stringify(formattedEntry));
        break;
    }
  }

  /**
   * Log information about API requests
   */
  public logApiRequest(method: string, path: string, metadata?: Record<string, any>): void {
    this.log('info', `API Request: ${method} ${path}`, metadata);
  }

  /**
   * Log API errors with appropriate metadata
   */
  public logApiError(error: Error, path: string, metadata?: Record<string, any>): void {
    this.log('error', `API Error on ${path}: ${error.message}`, {
      ...metadata,
      stack: error.stack,
      name: error.name
    });
  }

  /**
   * General purpose logging method
   */
  public log(level: LogLevel, message: string, metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      message,
      level,
      timestamp: new Date().toISOString(),
      metadata
    };

    this.logToConsole(entry);

    // Here we could add additional logging targets:
    // - Write to a log file
    // - Send to a logging service
    // - Store in a database
  }

  /**
   * Helper methods for specific log levels
   */
  public info(message: string, metadata?: Record<string, any>): void {
    this.log('info', message, metadata);
  }

  public warn(message: string, metadata?: Record<string, any>): void {
    this.log('warn', message, metadata);
  }

  public error(message: string, metadata?: Record<string, any>): void {
    this.log('error', message, metadata);
  }

  public debug(message: string, metadata?: Record<string, any>): void {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, metadata);
    }
  }
}

// Export a singleton instance
export const logger = new Logger(); 