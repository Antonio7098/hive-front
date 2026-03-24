import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';

export type KanbanColumnId = 'backlog' | 'pending' | 'active' | 'blocked' | 'done' | 'todo' | 'completed' | 'draft' | 'archived';

export interface KanbanItem {
  id: string;
  content: ReactNode;
}

interface KanbanColumn {
  id: KanbanColumnId;
  title: string;
  color: string;
  items: KanbanItem[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onMoveItem?: (itemId: string, fromColumn: KanbanColumnId, toColumn: KanbanColumnId) => void;
  className?: string;
}

interface SortableCardProps {
  id: string;
  children: ReactNode;
}

function SortableCard({ id, children }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

export function KanbanBoard({ columns, onMoveItem, className = '' }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localColumns, setLocalColumns] = useState(columns);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findColumnOfItem(itemId: string): KanbanColumn | undefined {
    return localColumns.find((col) =>
      col.items.some((item) => item.id === itemId)
    );
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumnOfItem(activeId);
    const overColumn = findColumnOfItem(overId) || localColumns.find((col) => col.id === overId);

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

    setLocalColumns((cols) => {
      const newCols = cols.map((c) => ({ ...c, items: [...c.items] }));
      const activeItems = newCols.find((c) => c.id === activeColumn.id)!.items;
      const overItems = newCols.find((c) => c.id === overColumn.id)!.items;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const [movedItem] = activeItems.splice(activeIndex, 1);

      const overIndex = overItems.findIndex((i) => i.id === overId);
      if (overIndex === -1) {
        overItems.push(movedItem);
      } else {
        overItems.splice(overIndex, 0, movedItem);
      }

      return newCols;
    });

    onMoveItem?.(activeId, activeColumn.id, overColumn.id);
  }

  function handleDragEnd(_event: DragEndEvent) {
    setActiveId(null);
  }

  const activeItem = activeId
    ? localColumns.flatMap((c) => c.items).find((i) => i.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
        {localColumns.map((column) => (
          <div key={column.id} className="flex-1 min-w-[280px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 ${column.color}`} />
              <span className="font-headline font-bold uppercase tracking-widest text-sm">
                {column.title}
              </span>
              <span className="font-mono text-xs text-outline ml-auto">
                {column.items.length}
              </span>
            </div>
            <SortableContext
              items={column.items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3 min-h-[200px]">
                {column.items.map((item) => (
                  <SortableCard key={item.id} id={item.id}>
                    {item.content}
                  </SortableCard>
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="opacity-90 shadow-2xl rotate-2">
            {activeItem.content}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}