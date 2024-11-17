type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface RequestOptions {
  method: RequestMethod;
  url: string;
  body?: Record<string, unknown>;
  headers?: HeadersInit;
}

export async function requestHandler<T>({
  method,
  url,
  body,
  headers = { "Content-Type": "application/json" },
}: RequestOptions): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // Timeout after 15 seconds

  try {
    const options: RequestInit = {
      method,
      headers,
      signal: controller.signal,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok && !data.error) {
      // If the response is successful and error is false, return the data
      return data;
    } else if (data.error && data.message) {
      // If error is true and message exists, show the message
      throw new Error(data.message); // Throw the error to handle it in a unified way
    } else {
      // Handle other cases where the response is not OK or has no meaningful error message
      throw new Error("Something went wrong. Please try again.");
    }
  } catch (error) {
    // Handle network errors, timeouts, or unexpected errors
    if ((error as Error).name === "AbortError") {
      const timeoutMessage = "Request timeout. Please try again.";
      throw new Error(timeoutMessage);
    }

    // If an error is thrown intentionally with a message, show that message
    if (error instanceof Error && error.message) {
      throw error; // Re-throw to allow component-specific handling if needed
    }

    // Generic fallback error
    const genericError = "An unexpected error occurred. Please try again.";
    throw new Error(genericError);
  } finally {
    clearTimeout(timeout);
  }
}
