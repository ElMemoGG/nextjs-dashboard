"use client";

import { useSearchParams } from "next/navigation";
export default function CustomersPages({searchParams, }: { searchParams: { id: string | undefined}}) {

  console.log(searchParams.id)
  
    return <p>Customers {searchParams.id}</p>;
  }