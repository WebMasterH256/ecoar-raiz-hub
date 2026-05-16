const API_URL = "http://localhost:5172/api"; // Default ASP.NET Core port

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("ecoar_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${API_URL}${path}`, { headers: getHeaders() });
    if (!res.ok) throw new Error(await res.text() || "Erro na requisição");
    return res.json();
  },
  post: async (path: string, body: any) => {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text() || "Erro na requisição");
    return res.json();
  },
};

export const supabase = {
  auth: {
    getUser: async () => {
      const userStr = typeof window !== 'undefined' ? localStorage.getItem("ecoar_user") : null;
      if (!userStr) return { data: { user: null } };
      return { data: { user: JSON.parse(userStr) } };
    },
    signInWithPassword: async ({ email, password }: any) => {
      try {
        const data = await api.post("/auth/login", { email, password });
        localStorage.setItem("ecoar_token", data.token);
        localStorage.setItem("ecoar_user", JSON.stringify({ id: data.id, email: data.email }));
        return { data, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },
    signUp: async ({ email, password, options }: any) => {
      try {
        const data = await api.post("/auth/register", { 
          email, 
          password, 
          fullName: options?.data?.full_name || email.split('@')[0] 
        });
        localStorage.setItem("ecoar_token", data.token);
        localStorage.setItem("ecoar_user", JSON.stringify({ id: data.id, email: data.email }));
        return { data, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },
    signOut: async () => {
      localStorage.removeItem("ecoar_token");
      localStorage.removeItem("ecoar_user");
      return { error: null };
    },
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          if (table === "profiles") {
            try {
              const data = await api.get(`/auth/profile`); // Need to implement this endpoint
              return { data, error: null };
            } catch (error: any) {
              return { data: null, error };
            }
          }
          return { data: null, error: new Error("Not implemented") };
        }
      })
    })
  })
};
