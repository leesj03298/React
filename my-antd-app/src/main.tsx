// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ConfigProvider, theme as antdTheme } from "antd";
// import App from "./App.tsx";
// import "antd/dist/reset.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ConfigProvider
//       theme={{
//         algorithm: antdTheme.defaultAlgorithm,
//         token: {
//           colorPrimary: "#1677ff", // 필요시 브랜드 컬러
//           borderRadius: 10,
//         },
//       }}
//     >
//       <App />
//     </ConfigProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css"; // antd v5 CSS reset

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

