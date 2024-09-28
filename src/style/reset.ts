import { css } from '@emotion/react';
import "@/style/_fonts.scss";

export const reset = css`
  * {
    font-family: Pretendard, sans-serif;
  }
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select {
    margin: 0;
    border: 0;
    padding: 0;
    outline: none;
    cursor: pointer;
  }

  html {
    box-sizing: border-box;
    line-height: 1.2;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  *::-webkit-scrollbar{
    display: none;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }
  //custom style
  //TODO: 컬러 variant 설정 후 하단 값 변경
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    background-color: #121212;
    //background-color: #ffffff;
  }
  html {
    width: 100%;
    height: 100vh;
    //padding-top: env(safe-area-inset-top);
    overscroll-behavior: none;

    @media all and (display-mode: standalone) {
      height: 100vh;
      overscroll-behavior: none;
    }
  }
  body { overflow-y: auto; }
  input, span, select, textarea, button, a, label {-webkit-tap-highlight-color:rgba(0,0,0,0);}
`;
