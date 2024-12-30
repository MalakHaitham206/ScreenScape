const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  return isAuthenticated ? children : <div>Please log in</div>;
};
