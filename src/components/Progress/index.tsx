import { styled } from "styled-components";

const ProgressContainer = styled.div`
  height: 7px;
  width: 100%;
  position: relative;
  background: #4b4b4b;
  border-radius: 7px;
  margin-top: 20px;
`;

const ProgressBackground = styled.div`
  width: 100%;
`;

interface ProgressProps {
    percent: number
}

const Progress = ({ percent }: ProgressProps) => {

    const Progress = styled.div`
        background: #6320EE;
        border-radius: 7px;
        height: 7px;
        width: ${percent}%;
    `;

    return (
        <ProgressContainer>
            <ProgressBackground />
            <Progress />
        </ProgressContainer>
    )
}

export default Progress;