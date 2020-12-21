import React, { useRef } from 'react';
import { Checkbox } from 'antd';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragIcon from './drag-icon';
import { arrayMove } from '../../../utils';

const ColumnSetting = ({ columns, onColumnsChange }) => {
  const column2DndItem: React.FC<any> = ({ title, key, dataIndex, hideInSearchList }, index) => {
    /*
    const move = (dragIndex, hoverIndex) => {
      console.log(dragIndex, hoverIndex);
    };
     */

    const end = (id: string, targetIndex: number) => {
      const sourceIndex = columns.findIndex(column => (column.dataIndex || column.key) === id);
      onColumnsChange?.(arrayMove(columns, sourceIndex, targetIndex));
    };

    const check = (e: any) => {
      onColumnsChange?.(
        columns.map(({ hideInSearchList, ...item }) => ({
          hideInSearchList:
            (item.dataIndex || item.key) === (dataIndex || key)
              ? !e.target.checked
              : !!hideInSearchList,
          ...item,
        })),
      );
    };

    return (
      <DndItem key={key || dataIndex} id={dataIndex} index={index} /* move={move} */ end={end}>
        <div className="list-item">
          <DragIcon />
          <Checkbox checked={!hideInSearchList} onChange={check}>
            {title}
          </Checkbox>
        </div>
      </DndItem>
    );
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>{columns.map(column2DndItem)}</DndProvider>
    </div>
  );
};

export default ColumnSetting;

const DndItem: React.FC<DragItemProps> = ({ id, index, move, end, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) return {};
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;
      const { index: dragIndex } = item;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      if (move) move(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: item => {
      if (!item) return;
      end(item.id, item.index);
    },
  });

  const style = isDragging ? { opacity: 0.8, cursor: 'move' } : { cursor: 'move' };
  const overStyle = isOver ? { border: '1px solid #ddd', margin: -1 } : {};

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        ...style,
        ...overStyle,
      }}
    >
      {children}
    </div>
  );
};

interface DragItemProps {
  id: any;
  index: number;
  move?: (dragIndex: number, hoverIndex: number) => void;
  end: (id: string, dragIndex: number) => void;
}

interface DragItem {
  id: string;
  index: number;
  type: string;
}

const ItemTypes = {
  CARD: 'card',
};
