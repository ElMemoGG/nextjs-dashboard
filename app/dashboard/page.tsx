


import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons';
import { unstable_noStore as noStore } from 'next/cache';
import NextId from '../ui/dashboard/next-id';
import NextPage from '../ui/dashboard/next-page';


/* export const dynamicParams = true
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store' */

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { id: string | undefined; include: string | undefined };
}) {
  noStore()
    
    const {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    } = await fetchCardData();

    return (
      <main>
        {/* <NextId/> */}
        <NextPage/>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
          <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
          <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<RevenueChartSkeleton/>}>
            <RevenueChart   />
          </Suspense>
          {/* <RevenueChart revenue={revenue} /> */}
          <Suspense fallback={<LatestInvoicesSkeleton/>}>
          <LatestInvoices  />
          </Suspense>
          
        </div>
      </main>
    );
  }