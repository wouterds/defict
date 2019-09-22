import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
`;

export const Header = styled.div`
  background: #111;
  color: #fff;
  padding-top: 35px;
  padding-left: 50px;
  height: 160px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 2px solid #111;

  h1 {
    font-size: 2.2em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    word-spacing: 0.1em;
  }

  h2 {
    opacity: 0.25;
    font-size: 1.2em;
    font-weight: 500;
  }
`;

export const Content = styled.div`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 2px solid #111;
  padding: 50px;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 10px;
  }

  input {
    outline: 0;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 10px;
    width: 100%;
  }
`;

export const Info = styled.div`
  border-top: 2px dashed #eee;
  margin-top: 25px;
  padding-top: 25px;

  label {
    display: inline-block;
    margin-right: 5px;
  }

  ul ul {
    margin-top: -5px;
  }
`;
