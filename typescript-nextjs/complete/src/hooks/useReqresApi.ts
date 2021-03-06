import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ReqresApiResponse } from "types/api";

function useReqresApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<ReqresApiResponse<T>>(
          `https://reqres.in/api/${endpoint}`
        );
        setData(res.data.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            console.log(`There is no endpoint ${endpoint}`);
          } else {
            console.log("Failed to fetch data (Axios Error)");
          }
        } else {
          console.log("Failed to fetch data");
        }
      }
    }

    fetchData();
  }, [endpoint]);

  return data;
}

export default useReqresApi;
