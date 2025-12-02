export async function getApi(endpoint) {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching API:", error);
    return null; // Return null if there’s an error
  }
}
