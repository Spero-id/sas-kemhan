import Link from "next/link";

interface LinkPreviousProps {
  href: string;
  name: string;
  active?: boolean;
}

interface BreadcrumbProps {
  pageName: string;
  showPageName?: boolean;
  linkPrevious?: LinkPreviousProps[];
}

const Breadcrumb = ({ pageName, linkPrevious = [], showPageName=true }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {showPageName ? pageName : ''}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {linkPrevious.length > 0 ? (
            linkPrevious.map((link) =>
              link.active ? (
                <li
                  className="font-medium text-primary"
                  key={link.name.replace(" ", "_").toLowerCase()}
                >
                  {link.name}
                </li>
              ) : (
                <li key={link.name.replace(" ", "_").toLowerCase()}>
                  <Link className="font-medium" href={link.href}>
                    {link.name}
                  </Link>
                </li>
              )
            )
          ) : (
            <>
              <li className="font-medium text-primary" key={pageName}>
                {pageName}
              </li>
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
