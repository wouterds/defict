import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import 'https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap';

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: inside;
    list-style-type: none;
  }

  input,
  textarea,
  button,
  select {
    -webkit-appearance: none;
    border-radius: 0;
    outline: 0;
    font-family: inherit;

    &[type=checkbox] {
      -webkit-appearance: checkbox;
    }
  }

  html {
    font-size: 62.5%;
  }

  html,
  body {
    min-height: 100%;
    height: 100%;
  }

  #__next {
    min-height: 100%;
    padding: 50px;
  }

  body {
    font-family: "Roboto", -apple-system, "San Francisco", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
    background: #fff;
    font-size: 1.6rem;
    line-height: 1.6;

    input,
    textarea,
    button,
    select {
      font-size: 1.6rem;
    }
  }
`;
