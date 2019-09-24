import React, {useRef, useContext} from 'react';
import {useDrag, useDrop} from 'react-dnd';

import BoardContext from '../Board/context';
import { Container, Label } from './styles';

export default function Card({data, index, listIndex}) {

  const Ref = useRef(); 

  const {move} = useContext(BoardContext);

  const [{isDragging}, dragRef] = useDrag({
    item: {type: 'CARD', index, listIndex},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [, dropRef] = useDrop({
      accept: 'CARD',
      hover(item, monitor){
       const draggedListIndex = item.listIndex

      const targetIndexList = listIndex;

        const draggedIndex = item.index;
        const targetIndex = index;

        if(draggedIndex === targetIndex && draggedListIndex === targetIndexList){
          return;
        }

        const targetSize = Ref.current.getBoundingClientRect();
        const targetCenter = (targetSize.botton - targetSize.top) / 2;

        const draggedOffSet = monitor.getClientOffset;
        const draggedTop = draggedOffSet.y - targetSize.top;

        if(draggedIndex < targetIndex && draggedTop < targetCenter){
          return;
        }

        if(draggedIndex > targetIndex && draggedTop > targetCenter){
          return;
        }
        move(draggedListIndex,draggedIndex,targetIndexList, targetIndex);
        item.index = targetIndex;
        item.listIndex = targetIndexList;
      }
  })

    dragRef(dropRef(Ref));
  return (
    <Container ref = {Ref} isDragging={isDragging}>
      {data.labels.map(label => <Label key={label} color={label}/>)}
      <header>
        <Label color='#7159c1'/>
      </header>
      <p>{data.content}</p>
      {data.user &&<img src={data.user} alt=''></img>}
    </Container>
  );
}
