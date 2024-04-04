'use client'
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

const useParamsPage = (name) => {
  const [pageModulo, setPageModulo] = useState({
    page: 0,
    pageSize: 20
  });
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    const page = router.query[name] ? parseInt(router.query[name]) : 0;
    setPageModulo(prevState => ({ ...prevState, page }));
  }, [router.query, name]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(router.query);
      params.set(name, value);
      return params.toString();
    },
    [router.query]
  );

  const handlePageChange = (newPage) => {
    const queryString = createQueryString(name, newPage);
    router.push({ pathname, query: { ...router.query, [name]: newPage } }, undefined, { shallow: true });
  };

  return { pageModulo, setPageModulo, handlePageChange };
};

export default useParamsPage;
