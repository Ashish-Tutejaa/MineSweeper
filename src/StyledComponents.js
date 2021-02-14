import styled from "styled-components";

export const Wrapper = styled.div`
  width: ${(props) => props.w || "100%"};
  height: ${(props) => props.h || "100%"};
  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.col ? "column" : "row")};
  ${(props) => {
    if (props.flex) {
      return `
            justify-content:${props.jc};
            align-items:${props.al};
            `;
    }
    return "";
  }}
  background-color: #FAFAFA;
`;
