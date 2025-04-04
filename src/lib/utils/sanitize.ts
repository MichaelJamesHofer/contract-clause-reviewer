/**
 * Utility functions for input sanitization to prevent XSS and other injection attacks
 */

/**
 * Sanitizes a string by removing HTML tags, script tags, and other potentially dangerous content
 * @param input The string to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags and scripts
  const withoutTags = input.replace(/<[^>]*>/g, '');
  
  // Encode characters that could be used in XSS attacks
  return withoutTags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes an object by applying string sanitization to all string properties
 * @param obj The object to sanitize
 * @returns A new sanitized object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return {} as T;
  
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeString(value) as any;
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key as keyof T] = sanitizeObject(value);
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}

/**
 * Validates that an object contains the required properties
 * @param obj Object to validate
 * @param requiredProps Array of required property names
 * @returns Object with validation result and optional error message
 */
export function validateRequiredFields<T extends Record<string, any>>(
  obj: T, 
  requiredProps: (keyof T)[]
): { valid: boolean; message?: string } {
  const missingProps = requiredProps.filter(prop => !obj[prop]);
  
  if (missingProps.length > 0) {
    return {
      valid: false,
      message: `Missing required fields: ${missingProps.join(', ')}`
    };
  }
  
  return { valid: true };
} 