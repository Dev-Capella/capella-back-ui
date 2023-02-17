import { useQuery } from "react-query";

export function useService(name,test) {
    const query = useQuery(name,test);
  
    if(query.isError){
        console.log(query.error.message)
    }
  
    return query;
}
