const Loader: React.FC = () => (
  <div className="flex flex-col justify-center items-center h-64">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-primary mb-4"></div>
    <span className="text-lg text-primary">Loading...</span>
  </div>
);

export default Loader;
