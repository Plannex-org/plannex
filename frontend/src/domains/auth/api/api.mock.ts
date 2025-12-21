type User = { name: string; email: string; password: string };

const USERS_KEY = "plannex_users";

const readUsers = (): User[] => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
const writeUsers = (users: User[]) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const authMockApi = {
  register: async (payload: { name: string; email: string; password: string }) => {
    const users = readUsers();
    if (users.some((u) => u.email === payload.email)) throw new Error("Email already exists");
    writeUsers([...users, payload]);
    return { token: `mock-token-${Date.now()}` };
  },

  login: async (payload: { email: string; password: string }) => {
    const users = readUsers();
    const found = users.find((u) => u.email === payload.email && u.password === payload.password);
    if (!found) throw new Error("Invalid credentials");
    return { token: `mock-token-${Date.now()}` };
  },
};
