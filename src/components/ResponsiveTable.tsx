import React from 'react';
import classNames from 'clsx';

interface Props extends React.PropsWithChildren {
  containerClassName?: string;
  tableClassName?: string;
  hover?: boolean;
}

const ResponsiveTable: React.FC<Props> = ({
  children,
  containerClassName,
  tableClassName,
  hover = true,
}) => {
  return (
    <div className={classNames('table-responsive', containerClassName)}>
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
