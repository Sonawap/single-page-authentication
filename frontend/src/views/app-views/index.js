import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "components/Loading";

const Home = lazy(() => import(`./home`));
export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Routes>
        <Route path="/" element={<Home title="Welcome to our webapp"/>} />
      </Routes>
    </Suspense>
  );
};

export default React.memo(AppViews);
