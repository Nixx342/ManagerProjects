<script setup>
    import { ref, reactive } from 'vue'
    import axios from 'axios'
    // const id = route.params.id
    // const lists = reactive({data: []})
    const lists = ref([])

    axios.get(`http://localhost:3000/board/1`)
    .then(response => {
      lists.value = response.data.data
    })
    .catch(error => {
        console.log(error)
    })


  
    // const lists = ref([
    //   { name: 'List 1', items: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }] },
    //   { name: 'List 2', items: [{ id: 3, name: 'Item 3' }, { id: 4, name: 'Item 4' }] },
    //   { name: 'List 3', items: [{ id: 5, name: 'Item 5' }, { id: 6, name: 'Item 6' }] }
    // ])
  
    let draggedItem = null
  
    function handleDragStart(item, listIndex) {
      draggedItem = { item, listIndex }
    }
  
    function handleDragEnd() {
      draggedItem = null
    }
  

    function handleDrop(dropListIndex, boardId) {
      if (draggedItem) {
        const { item, listIndex } = draggedItem;
        if (listIndex !== dropListIndex) {
          const droppedItem = lists.value[listIndex].items.find(i => i === item);
          lists.value[listIndex].items.splice(lists.value[listIndex].items.indexOf(droppedItem), 1);
          lists.value[dropListIndex].items.push(droppedItem);
          draggedItem = null;

          axios.post('http://localhost:3000/update-task-board-id', { taskId: droppedItem.id, newBoardId: boardId })
            .then(response => {
              // Обработка успешного ответа
              console.log('Успешно обновлен board_id для задачи');
            })
            .catch(error => {
              // Обработка ошибки
              console.error('Ошибка при обновлении board_id для задачи:', error);
            });
        }
      }
    }



    // function handleDrop(dropListIndex) {
    //   if (draggedItem) {
    //     const { item, listIndex } = draggedItem
    //     if (listIndex !== dropListIndex) {
    //       const droppedItem = lists.value[listIndex].items.find(i => i === item)
    //       lists.value[listIndex].items.splice(lists.value[listIndex].items.indexOf(droppedItem), 1)
    //       lists.value[dropListIndex].items.push(droppedItem)
    //       draggedItem = null

    //       axios.post('/update-task-board-id', { taskId: droppedItem.id, newBoardId: boardId })
    //       .then(response => {
    //         // Обработка успешного ответа
    //       })
    //       .catch(error => {
    //         // Обработка ошибки
    //       });
    //     }
    //   }
    // }
  </script>

<template>
    <div class="board">
      <div
        v-for="(list, index) in lists"
        :key="index"
        class="list"
        @dragover.prevent
        @drop="handleDrop(index)"
      >
        <h3>{{ list.name }}</h3>
        <ul>
          <li
            v-for="item in list.items"
            :key="item.id"
            class="item"
            draggable="true"
            @dragstart="handleDragStart(item, index)"
            @dragend="handleDragEnd"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <style scoped>
  .board {
  display: flex;
}

.list {
  flex-grow: 1; /* Разрешаем элементу расширяться, чтобы занимать доступное пространство */
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex; /* Добавляем display: flex, чтобы элементы внутри .list также могли использовать flex */
  flex-direction: column; /* Устанавливаем направление flex на колонки, чтобы элементы внутри .list шли вертикально */
}

ul {
  list-style: none;
  padding: 0;
}

.item {
  padding: 5px;
  margin: 5px;
  background-color: #1d1c1c;
  cursor: pointer;
}
  </style>
  