import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Something went wrong" }: IProps) => {
  const error = useRouteError();

  let status = statusCode;
  let errorTitle = title;
  let errorMessage = "An unexpected error occurred. Please try again later.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    errorTitle = error.statusText || title;
    errorMessage = error.data?.message || (status === 404 ? "The page you are looking for does not exist." : errorMessage);
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>

        <span className="text-sm font-semibold uppercase tracking-wider text-red-500">Error {status}</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{errorTitle}</h1>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{errorMessage}</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            replace
            className="px-5 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm"
          >
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;
