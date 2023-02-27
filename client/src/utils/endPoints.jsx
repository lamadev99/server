import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

const baseUrl = 'https://news.goenergy.com.np/api'

export const fetchData = (key, fn) => {
  const url = baseUrl + fn;

  const res = useQuery(
  {
    queryKey: [key],
    queryFn: async () => {
      try {
        const res = await axios.get(url)
        return res;
      } catch (error) {
        throw Error("Operation Failed!! Please try again.");
      }
    }
  });
  return res;
}
