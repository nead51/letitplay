import React from 'react';
import styled from 'styled-components';

export const Grid = styled.div`

`;

export const Row = styled.div`
display: flex;
`;


export const Col = styled.div`
flex: ${(props) => props.size};
height: 20vh;

`;

const OrangeCol = styled(Col)`
background: orange;
`;
const RedCol = styled(Col)`
background: Red;
`;
const BlueCol = styled(Col)`
background: Blue;
`;
const TealCol = styled(Col)`
background: teal;
`;
const PurpleCol = styled(Col)`
background: Purple;
`;
const BlackCol = styled(Col)`
background: Black;
`;
const YellowCol = styled(Col)`
background: yellow;
`;
const GreenCol = styled(Col)`
background: green;
`;



const Step4 = () => {
  return (
    <div>
      <h1>Let it Play</h1>
      <Grid>
        <Row>
        <OrangeCol size={1}>
          <a href="https://open.spotify.com/playlist/0CqmD4KFPDmZ1Wt7bAKB2G?si=1a8c01dadfc84c3b"></a>
          </OrangeCol>
          <RedCol size={1}>
          <a href="https://open.spotify.com/playlist/6dvRFS1QdXeHq40BVjCIf4?si=06e37dc30d904439"></a>
          </RedCol>
        </Row>
        <Row>
          <BlueCol size={1}>
          <a href="https://open.spotify.com/playlist/4lILAGAYQVoqeOPWaLFDvH?si=29346e4086f14a1a"></a>
          </BlueCol>
          <YellowCol size={1}>
          <a href="https://open.spotify.com/playlist/3xrhDVBGDz3H1grIeimFE5?si=a079c3be463b43cd"></a>
          </YellowCol>
        </Row>
        <Row>
          <BlackCol size={1}>
          <a href="https://open.spotify.com/playlist/0VDxg81btEVrJHqNJ20vDe?si=4157936f088947c0"></a>
          </BlackCol>
          <PurpleCol size={1}>
          <a href="https://open.spotify.com/playlist/5oJj9r47kX9R6Ltzt4QksS?si=0dbc058ca947412c"></a>
          </PurpleCol>
        </Row> <Row>
          <GreenCol size={1}>
          <a href="https://open.spotify.com/playlist/0p4bEGdf4TN320Jdsbl7Jk?si=f40f192fe53d4284Green"></a>
          </GreenCol>
          <TealCol size={1}>
          <a href="https://open.spotify.com/playlist/0iLxSZh8K8RzxQ6WRq2q94?si=ba910536ef6547c0"></a>
          </TealCol>
        </Row>
      </Grid>
    </div>
  );
};

export default Step4;