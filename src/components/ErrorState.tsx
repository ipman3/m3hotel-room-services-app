const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="mb-4 text-2xl font-bold text-card-foreground">
        Oops! Something went wrong.
      </h2>
      <p className="max-w-md text-base text-center text-card-foreground">
        We encountered an error while trying to load the content. Please try
        refreshing the page or come back later.
      </p>
    </div>
  );
};

export default ErrorState;