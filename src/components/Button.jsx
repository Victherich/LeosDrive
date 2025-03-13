import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;

  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;

export default Button;
