import { deleteCookie, getCookie } from "cookies-next"; // Assuming cookies-next for cookie management

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface RequestOptions {
  method: RequestMethod;
  url: string;
  body?: Record<string, unknown>;
  headers?: HeadersInit;
  onUnauthorized?: () => void; // Callback for unauthorized handling
  protected?: boolean; // Indicates if the request is protected and requires authentication
}

export async function requestHandler<T>({
  method,
  url,
  body,
  headers = { "Content-Type": "application/json" },
  onUnauthorized,
  protected: isProtected = false,
}: RequestOptions): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // Timeout after 15 seconds

  try {
    const options: RequestInit = {
      method,
      headers: { ...headers }, // Spread to avoid mutating the original object
      signal: controller.signal,
    };

    // Include the token if the request is protected
    if (isProtected) {
      const token = getCookie("token");
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`, // Add Authorization header
        };
      }
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok && !data.error) {
      return data;
    } else if (data.error && data.message) {
      if (data.message === "Unauthorized access") {
        // Handle unauthorized access
        deleteCookie("token"); // Remove token cookie

        if (onUnauthorized) {
          onUnauthorized(); // Execute the callback if provided
        } else if (typeof window !== "undefined") {
          window.location.href = "/auth/login"; // Redirect to login page
        }

        throw new Error(
          "You have been logged out because you are not authorized to access this page."
        );
      }

      throw new Error(data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }

    if (error instanceof Error && error.message) {
      throw error;
    }

    throw new Error("An unexpected error occurred. Please try again.");
  } finally {
    clearTimeout(timeout);
  }
}
