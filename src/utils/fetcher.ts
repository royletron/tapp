/**
 * Basic fetcher function for useSWR, takes a url and returns a promise that should resolve with JSON
 * @param {string} url
 * @returns {Promise<any>}
 */
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default fetcher;
