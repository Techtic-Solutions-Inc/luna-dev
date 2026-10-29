/** Development-only mock bodies; imported dynamically so production bundles omit them. */
export const MOCK_BOUND_READS: Readonly<Record<string, unknown>> = {
  "GET /api/profile": {
    data: {
      email: "mock_email@example.com",
      first_name: "mock_first_name",
      last_name: "mock_last_name",
      full_name: "mock_first_name mock_last_name",
      mobile_number: "+1 555 0100",
      bio: "mock bio",
      time_zone: "America/New_York",
      street: "123 Mock St",
      city: "Mock City",
      state: "Mock State",
      zip: "12345",
      country: "Mock Country",
    },
  },
};
