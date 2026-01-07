export function useGetParamsFromURL(param: string): string {
  const hash = window.location.hash;
  if (hash.includes("?")) {
    const params = new URLSearchParams(hash.split("?")[1]);
    return params.get(param) || "";
  }
  return "";
}
