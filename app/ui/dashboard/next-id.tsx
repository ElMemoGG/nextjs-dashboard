'use client'


import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function NextId(){
    const searchParams = useSearchParams()!;
  const id = searchParams.get("id");
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams]
  );
    return(
        <div>

        <button  onClick={() => {
          let nextId = parseInt(id ?? "0") + 1;
          router.push(`${pathname}/?${createQueryString("id", nextId.toString())}`);
        }}>Add more</button>
        <h2>
            the id is: {id}
        </h2>

        </div>
    )

}