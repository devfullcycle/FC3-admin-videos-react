export function buildQueryString<T extends Record<string, any>>(
  params: T
): string {
  const query = new URLSearchParams();

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      query.append(key, params[key].toString());
    }
  }

  return query.toString();
}
