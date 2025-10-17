/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function post({
  endpoint,
  data,
  params,
}: {
  endpoint: string;
  data?: Record<string, any> | null;
  params?: Record<string, any>;
}) {
  // Validate endpoint
  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("Invalid endpoint");
  }

  // Handle fallback to GET (when no data provided)
  if (!data && !params) {
    return get({ endpoint });
  }

  if (!data && params) {
    return get({ endpoint, params });
  }

  // Validate params
  if (params && typeof params !== "object") {
    throw new Error("Invalid params — expected an object");
  }

  // Validate data
  if (data !== null && typeof data !== "object") {
    throw new Error("Invalid data — expected an object");
  }

  // Build URL
  const baseURL = import.meta.env.VITE_API_URL;
  if (!baseURL) throw new Error("Missing API base URL");

  const urlParams = params ? new URLSearchParams(params).toString() : "";
  const url = urlParams
    ? `${baseURL}${endpoint}?${urlParams}`
    : `${baseURL}${endpoint}`;

  // Prepare request body safely
  const body =
    data && Object.keys(data).length > 0
      ? new URLSearchParams(data as Record<string, string>).toString()
      : undefined;

  // Execute request
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText || res.statusText}`);
    }

    // Try parsing as JSON, fallback to text if invalid
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
}

// Reusable GET helper
export async function get({
  endpoint,
  params,
}: {
  endpoint: string;
  params?: Record<string, any>;
}) {
  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("Invalid endpoint");
  }

  if (params && typeof params !== "object") {
    throw new Error("Invalid params — expected an object");
  }

  const baseURL = import.meta.env.VITE_API_URL;
  if (!baseURL) throw new Error("Missing API base URL");

  const urlParams = params ? new URLSearchParams(params).toString() : "";
  const url = urlParams
    ? `${baseURL}${endpoint}?${urlParams}`
    : `${baseURL}${endpoint}`;

  if (import.meta.env.DEV) {
    console.log("[GET]", url);
  }

  try {
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText || res.statusText}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
}
