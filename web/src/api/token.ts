const TOKEN_KEY = "primetrade_access_token";
let inMemoryToken: string | null = null;

export const getToken = (): string | null => {
  if (inMemoryToken) {
    return inMemoryToken;
  }

  const storedToken = localStorage.getItem(TOKEN_KEY);
  inMemoryToken = storedToken;
  return storedToken;
};

export const setToken = (token: string): void => {
  inMemoryToken = token;
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = (): void => {
  inMemoryToken = null;
  localStorage.removeItem(TOKEN_KEY);
};
