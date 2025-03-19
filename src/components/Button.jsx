import Link from "next/link";
import { forwardRef } from "react";

const Button = forwardRef(
  (
    { as: Component = "button", href, children, className = "", ...props },
    ref
  ) => {
    if (href) {
      return (
        <Link href={href} passHref legacyBehavior>
          <Component
            ref={ref}
            className={`cursor-pointer px-5 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
            {...props}
          >
            {children}
          </Component>
        </Link>
      );
    }

    return (
      <Component
        ref={ref}
        className={`cursor-pointer px-5 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
