import React from 'react';

// Standard frame for every /vendor/* and /admin/* page: a `header` slot (title, "Add"
// button, search/filter row) pinned to the top, with only the content below it scrolling.
// Keeps that split consistent across pages instead of each one reimplementing it.
const PageShell = (props) => {
  const { header, children, className = '' } = props;

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {header && <div className="shrink-0">{header}</div>}
      <div className="flex-1 min-h-0 overflow-y-auto pb-2">{children}</div>
    </div>
  )
}

export default PageShell;
