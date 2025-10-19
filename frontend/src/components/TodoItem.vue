<template>
  <li class="item-container">
    <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
      {{ todo.text }}
    </span>
    <button class="edit-btn" @click="$emit('edit', todo)">Edit</button>
    <button class="delete-btn" @click="$emit('remove', todo._id)">Delete</button>
  </li>
</template>

<script setup>
defineProps({
  todo: Object
})
defineEmits(['remove', 'edit'])
</script>

<style>
.delete-btn {
  margin-left: 6px;
  background-color: grey;
  border: none;
  padding: 6px;
  border-radius: 6px;
  border: 2px solid grey;
  color: white;
  cursor: pointer;
  transition: transform  0.2s;
}
.delete-btn:hover {
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: darkred;
  border-color: darkred;
}

.item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 8px;
  background-color: white;
  border-radius: 6px;
  font-family: sans-serif;
  font-size: 12px;
}

.item-container span {
  /* Add these for wrapping or truncating: */
  word-break: break-word;
  flex: 1 1 0;
  min-width: 0;
  margin-right: 8px;
}

</style>