import styled from "styled-components";
import { useState } from "react";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  border: 10px solid;
  border-color: ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

// function Circle(props: CircleProps) {
//   return <Container bgColor={props.bgColor} />;
// }
function Circle({ bgColor, text, borderColor }: CircleProps) {
  const [value, setValue] = useState<number | string>(1);
  setValue(2);

  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "orange"}>
      {text ?? "jello"}
    </Container>
  );
}

export default Circle;
