import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 text-sm font-medium leading-[60px] transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 hover:text-gray-700 focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
