import { createGlobalStyle } from "styled-components";

import "../scss/theme.scss";

const GlobalStyle = createGlobalStyle`
 body {
  min-height: 100%;
  background-image: radial-gradient(
    163.62% 163.62% at 50% -45.31%, 
    #0ED4FF 0%, 
    #FFFFFF 99.87%
  );
  background-attachment: fixed;
 }
 
 .card {
    max-width: 496px;
    border-radius: 10px;
 }
 
 .card-body {
    padding: 0.85rem !important;
    border-radius: 10px;
    background-color: #e6f7ff;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

 .list-group {
    .disabled {
        img {
            opacity:0.5;
        }
    }
 }
 
 html {
  height: 100%;
}

.brain {
  animation-name: brain-animation;
  animation-duration: 2.5s;
  transform-origin: 70% 70%;
  display: inline-block;
  cursor: pointer;
  animation-iteration-count: 1;
}

@keyframes brain-animation {
    0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}
`;

export default GlobalStyle;
