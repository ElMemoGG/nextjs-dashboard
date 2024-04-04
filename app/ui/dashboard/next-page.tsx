'use client'

import useParamsPage  from "../../lib/hooks/useParamsPage"

export default function NextPage(){
    const {pageModulo, setPageModulo} = useParamsPage("hola")

    return(
        <div>

        <button  onClick={() => {
          setPageModulo({...pageModulo, ["page"]: pageModulo.page+1})
         
        }}>Add more</button>
        <h2>
            the page is: {pageModulo.page}
    
        </h2>
        <h2>
           
            the pagesize is: {pageModulo.pageSize}
        </h2>

        </div>
    )

}