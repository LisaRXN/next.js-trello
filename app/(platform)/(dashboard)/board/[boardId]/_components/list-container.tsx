"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateListOrder } from "@/actions/update-list-order";
import { useAction } from "@/hooks/use-actions";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1); //retire (1) un élément d'index startIndex
  result.splice(endIndex, 0, removed); //ajoute (0) l'élément à l'index endIndex
  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdatedListOrder } = useAction(updateListOrder, {
    onSucces: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdatedCardOrder } = useAction(updateCardOrder, {
    onSucces: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    //Si drop à la même position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //Si drop d'une liste
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      executeUpdatedListOrder({ items, boardId });
    }

    //Si drop d'une card
    if (type === "card") {
      const newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destList.cards) {
        destList.cards = [];
      }

      //si drop d'une card dans la même list
      if (destination.droppableId === source.droppableId) {
        const reorderedCards = reorder(
          sourceList?.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdatedCardOrder({ items:reorderedCards, boardId:boardId });
      }
      //si drop d'une card dans une autre list
      else {
        //supprime la card la sourceList
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        //assigne le nouveau listeId à la card
        movedCard.listId = destination.droppableId;
        //ajoute la card à la destList
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeUpdatedCardOrder({ items:destList.cards, boardId:boardId });

      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
