"use server";

export default async function sendVerificationCode({ email }: { email: string }) {
  const res = await fetch(`${process.env.API_BASEURL}/auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email})
  });
  
  if (!res.ok) throw new Error("Failed to fetch reset code");

  const payload = await res.json();
  if (payload.statusMsg === "fail") throw new Error(payload.message);

  return payload;
}