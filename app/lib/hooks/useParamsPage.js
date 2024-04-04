import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function useParamsPage( name ) {
    const [pageModulo, setPageModulo] = useState({
        page: 0,
        pageSize: 20
    })
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = searchParams.get(name);
    console.log(page)

    useEffect(()=>{

      if(page ){
        router.push(`${pathname}/?${createQueryString(name, parseInt(page)+1)}`)
      }/* else{
        router.push(`${pathname}/?${createQueryString(name, 0)}`)
      } */

    },[pageModulo.page])

    useEffect(()=>{

      if(page == null){
        console.log("Change to 0")
        router.push(`${pathname}/?${createQueryString(name, 0)}`)
      }else {
        setPageModulo({...pageModulo, ["page"]: pageModulo.page})
      }

    },[searchParams])

    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams);
          params.set(name, value);
          return params.toString();
        },
        [searchParams]
      );

return {pageModulo, setPageModulo}
}
 
export default useParamsPage;