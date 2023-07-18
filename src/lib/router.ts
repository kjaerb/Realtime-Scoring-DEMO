const router = {
  home: "/",
  competition: {
    home: `/competition`,
    judge: (id: string) => `/competition/judge/${id}`,
  },
} as const;

export { router };
