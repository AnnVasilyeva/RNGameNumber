// import React, { ReactNode } from 'react';
// import Link, { LinkProps } from 'next/link';
// import classNames from 'classnames';

// interface ButtonProps<T extends 'a' | 'button' | typeof Link> {
//   as: T;
//   theme: 'primary' | 'secondary' | 'outlined';
//   icon?: ReactNode;
//   label?: string;
//   size: 'sm' | 'base' | 'lg';
//   iconRight?: boolean;
//   loading?: boolean;
//   disabled?: boolean;
// }

// export function Button<T extends 'a' | 'button' | typeof Link>({
//   as: Component,
//   theme,
//   icon,
//   label,
//   size,
//   iconRight,
//   loading,
//   disabled,
//   ...props
// }: ButtonProps<T> &
//   Omit<
//     T extends 'a' | 'button' ? JSX.IntrinsicElements[T] : LinkProps,
//     'className' | keyof ButtonProps<T>
//   >) {
//   return (
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     <Component
//       {...props}
//       {...(Component === 'button' ? { disabled } : {})}
//       className={classNames(
//         'group block w-full cursor-pointer',
//         size === 'sm' && 'rounded-lg p-2 text-sm-lh-100',
//         size === 'base' && 'rounded-xl p-3 text-sm-lh-100',
//         size === 'lg' && 'rounded-xl p-3 text-base-lh-100',
//         loading && 'cursor-wait bg-green-100 text-green-500',
//         disabled && 'cursor-not-allowed bg-green-100 text-white',
//         !loading &&
//           !disabled &&
//           theme === 'primary' &&
//           'bg-green-500 text-white hover:bg-green-400',
//         !loading &&
//           !disabled &&
//           theme === 'secondary' &&
//           'bg-gray-100 text-gray-800 hover:bg-gray-300',
//         !loading &&
//           !disabled &&
//           theme === 'outlined' &&
//           'border border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white',
//         !icon || !label ? 'text-center' : 'flex justify-center',
//       )}
//     >
//       {icon && !iconRight && (
//         <div className={classNames('h-4 w-4', { 'mr-2': label })}>{icon}</div>
//       )}
//       {label && <span>{label}</span>}
//       {icon && iconRight && <div className="h-4 w-4">{icon}</div>}
//     </Component>
//   );
// }
