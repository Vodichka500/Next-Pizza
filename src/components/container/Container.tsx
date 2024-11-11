import clsx from 'clsx';
import React from 'react';

interface Props {
    className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({className ,children }) => {
    return <div className={clsx('mx-auto max-w-[1280px]', className)}>{children}</div>;
};
