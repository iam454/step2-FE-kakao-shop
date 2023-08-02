import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInpage";
import SignUpPage from "./pages/SignUpPage";
import removeTokenByExpiration from "./utils/removeTokenByExpiration";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";

import "antd/dist/antd";
import OrderPage from "./pages/OrderPage";
import ResultPage from "./pages/ResultPage";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #fff;
    color: #000;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const staticServerUri = process.env.REACT_APP_PATH || "";

function App() {
  removeTokenByExpiration();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={`${staticServerUri}/`} element={<HomePage />}></Route>
          <Route
            path={`${staticServerUri}/signin`}
            element={<SignInPage />}
          ></Route>
          <Route
            path={`${staticServerUri}/signup`}
            element={<SignUpPage />}
          ></Route>
          <Route
            path={`${staticServerUri}/cart`}
            element={
              isLoggedIn ? (
                <CartPage />
              ) : (
                <Navigate to={`${staticServerUri}/signin`} replace />
              )
            }
          ></Route>
          <Route
            path={`${staticServerUri}/order`}
            element={
              isLoggedIn ? (
                <OrderPage />
              ) : (
                <Navigate to={`${staticServerUri}/signin`} replace />
              )
            }
          ></Route>
          <Route
            path={`${staticServerUri}/orders/:id`}
            element={
              isLoggedIn ? (
                <ResultPage />
              ) : (
                <Navigate to={`${staticServerUri}/signin`} replace />
              )
            }
          ></Route>
          <Route
            path={`${staticServerUri}/products/:id`}
            element={<ProductPage />}
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
