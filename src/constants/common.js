import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${reset};
    html,
    body {
          background: #ffffff;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
    }
    * {
          box-sizing: border-box;
    }
     
        .pointer {
          cursor : pointer;
        }
     
        .container {
          min-height: 20vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          margin-top:5px;
          line-height: 1;
          font-size: 0.85rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card-item {
          margin: 0.5rem;
          text-align: left;
          color: inherit;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          display: inline-block;
        }

        .card-item:hover,
        .card-item:focus,
        .card-item:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card-item span {
          margin-left:10px;
          font-size: 1rem;
          vertical-align: middle;
        }

        .logo {
          marginleft: -3px;
          height: 2em;
        }
        
        .feature_newcar {
        }
        
        .feature_newcar .cont_thumb {
            height: auto;
            padding: 0;
            background: none;
            text-align: center;
            white-space: nowrap;
        }
        
        .feature_newcar .tit_thumb {
            display: block;
            height: 24px;
            padding-top: 16px;
            padding-bottom: 16px;
            font-weight: 600;
            font-size: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #000;
        }
        
        .feature_newcar .info_thumb {
            display: inline-block;
            padding: 12px;
            font-weight: 400;
            -webkit-transition: none;
            transition: none;
            vertical-align: top;
            text-align: center;
        }
        
        .feature_newcar .info_thumb dd {
            overflow: hidden;
            font-weight: 400;
            color: #111;
        }
        
        .feature_newcar .info_thumb dd, .feature_newcar .info_thumb dt {
            font-size: 13px;
            line-height: 20px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
       	
`;
