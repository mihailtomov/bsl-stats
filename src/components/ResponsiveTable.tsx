import React from 'react';
import classNames from 'clsx';

interface Props extends React.PropsWithChildren {
  tableClassName?: string;
  hover?: boolean;
}

const ResponsiveTable: React.FC<Props> = ({
  children,
  tableClassName,
  hover = true,
}) => {
  return (
    <div className="table-responsive">
      <table
        className={classNames('table table-bordered', tableClassName, {
          'table-hover': hover,
        })}
      >
        {children}
      </table>
    </div>
  );
};

export default ResponsiveTable;
