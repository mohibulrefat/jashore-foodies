import api from "../lib/api";

// The shared axios instance already carries the access token and the
// refresh-on-401 interceptor (wired in AuthProvider). Kept as a hook that
// returns a tuple so existing call sites (`const [axiosSecure] = ...`) work.
const useAxiosSecure = () => [api];

export default useAxiosSecure;
