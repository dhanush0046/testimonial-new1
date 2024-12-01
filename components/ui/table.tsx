"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="overflow-x-auto">
      <table ref={ref} className={cn("w-full border-collapse", className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-muted", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("divide-y divide-muted-foreground", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "hover:bg-muted/10 data-[state=selected]:bg-muted/20",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "px-4 py-2 text-left text-sm font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-4 py-2 text-sm align-middle text-foreground", className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

interface TableCheckboxCellProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TableCheckboxCell: React.FC<TableCheckboxCellProps> = (props) => {
  return (
    <TableCell className="w-10">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-muted-foreground text-primary focus:ring-2 focus:ring-primary"
        {...props}
      />
    </TableCell>
  );
};

interface TableSortButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSorted?: boolean;
  isSortedDesc?: boolean;
}

const TableSortButton: React.FC<TableSortButtonProps> = ({
  isSorted,
  isSortedDesc,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <span>
        {isSorted ? (
          isSortedDesc ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 14l5-5 5 5z" />
            </svg>
          )
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-50"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCheckboxCell,
  TableSortButton,
};
