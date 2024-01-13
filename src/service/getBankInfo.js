export async function getBankInfo() {
  const url = import.meta.env.VITE_BANK_API;
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result.apps;
  } catch (error) {
    console.error(error);
  }
}
