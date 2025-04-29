import Link from 'next/link';
import React from 'react';

interface BreadcrumbProps{
    pageName: string;
}

export default function Breadcrumb({pageName}: BreadcrumbProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
      <h2 className="text-title-md2 font-semibold text-darkBlue">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-darkBlue hover:text-strokedark" href="/dashboard">
              Inicio /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName.length > 25 ? pageName.substring(0,25) + '...' : pageName}</li>
        </ol>
      </nav>
    </div>
  )
}
