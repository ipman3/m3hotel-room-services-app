/* eslint-disable @typescript-eslint/no-explicit-any */

// NOTE: POST helper
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
    throw new Error("Invalid URL");
  }

  // If no data provided, fallback to GET
  if (!data) {
    return get({ endpoint, params });
  }

  // Validate base URL
  const baseURL = import.meta.env.VITE_API_URL;
  if (!baseURL) {
    throw new Error("Missing API base URL");
  }

  try {
    const res = await fetch(`${baseURL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data as Record<string, string>).toString(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch POST error:", error);
    throw error;
  }
}

// NOTE: GET helper
export async function get({
  endpoint,
  params,
}: {
  endpoint: string;
  params?: Record<string, any>;
}) {
  if (!endpoint || typeof endpoint !== "string") {
    throw new Error("Invalid URL");
  }

  const baseURL = import.meta.env.VITE_API_URL;
  if (!baseURL) {
    throw new Error("Missing API base URL");
  }

  const urlParams = params ? new URLSearchParams(params).toString() : "";
  const fullUrl = urlParams
    ? `${baseURL}${endpoint}?${urlParams}`
    : `${baseURL}${endpoint}`;

  try {
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch GET error:", error);
    throw error;
  }
}
