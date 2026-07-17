"use server";

// Define exactly what the form data should look like
interface JoinFormData {
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  institution: string;
  mpesaMessage: string;
}

// Use the interface instead of 'any'
export async function submitJoinForm(formData: JoinFormData) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    throw new Error("Server configuration error: Missing Webhook URL");
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.status === "success") {
      return { success: true };
    } else {
      return { success: false, error: result.message };
    }
    
  } catch (error: unknown) { // Change 'any' to 'unknown'
    // Safely check if the error has a message we can extract
    const errorMessage = error instanceof Error ? error.message : "Failed to reach the server.";
    return { success: false, error: errorMessage };
  }
}