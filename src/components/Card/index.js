import React from 'react';


import { Container, Label } from './styles';

export default function Card({data}) {
  return (
    <Container>
      {data.labels.map(label => <Label key={label} color={label}/>)}
      <header>
        <Label color='#7159c1'/>
      </header>
      <p>{data.content}</p>
      {data.user &&<img src={data.user} alt=''></img>}
    </Container>
  );
}
