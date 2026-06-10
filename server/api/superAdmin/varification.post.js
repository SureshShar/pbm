export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const { password } = await readBody(event);

    if (!password) {
      return {
        success: false,
        authToken: null,
        message: "Password is required",
      };
    } else if (password === config.superAdminPassword) {
      return {
        success: true,
        authToken: config.superAdminAuthToken,
        message: "Authentication successful",
      };
    } else {
      return {
        success: false,
        authToken: null,
        message: "Invalid password",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during authentication",
    };
  }
});

// Not in Use
