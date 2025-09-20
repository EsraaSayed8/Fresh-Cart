class AuthError extends Error {
  type: string;
  constructor(message?: string, type?: string) {
    super(message || 'Session has expired');
    this.name = 'AuthError';
    this.type = type || 'SessionExpired';
  }
}

export {AuthError}