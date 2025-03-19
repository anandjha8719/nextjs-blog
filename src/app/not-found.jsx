import Link from "next/link";
import Button from "@/components/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link href="/" passHref>
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
