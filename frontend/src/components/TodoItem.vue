<template>
  <li class="item-container">
    <span v-if="!isEditing" :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
      {{ todo.text }}
    </span>
    <input class="edit-container" v-else v-model="editText" :maxlength="100" />
    <div class="button-group">
      <button v-if="!isEditing" class="edit-btn" @click="startEdit"><FontAwesomeIcon :icon="['fas', 'pen']" /></button>
      <button v-if="isEditing" class="edit-btn" @click="saveEdit"><FontAwesomeIcon :icon="['fas', 'floppy-disk']" /></button>
      <button v-if="isEditing" class="delete-btn" @click="cancelEdit"><FontAwesomeIcon :icon="['fas', 'ban']" /></button>
      <button v-if="!isEditing" class="delete-btn" @click="$emit('remove', todo._id)"><FontAwesomeIcon :icon="['fas', 'trash']" /></button>
    </div>
  </li>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

import { ref, watch } from 'vue'

const props = defineProps({ todo: Object })
const emit = defineEmits(['remove', 'edit'])

const isEditing = ref(false)
const editText = ref(props.todo.text)

watch(() => props.todo.text, (newText) => {
  if (!isEditing.value) editText.value = newText
})

function startEdit() {
  isEditing.value = true
  editText.value = props.todo.text
}

function saveEdit() {
  if (!editText.value.trim()) return
  emit('edit', { ...props.todo, text: editText.value })
  isEditing.value = false
}

function cancelEdit() {
  isEditing.value = false
  editText.value = props.todo.text
}
</script>

<style>
.delete-btn {
  background-color: grey;
  border: none;
  padding: 6px;
  border-radius: 6px;
  border: 2px solid grey;
  color: white;
  cursor: pointer;
  transition: transform  0.2s;
}

.button-group {
  display: flex;
  gap: 6px;
}
.edit-btn {
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
.edit-btn:hover {
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: darkblue;
  border-color: darkblue;
}

.item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Ensure consistent width for content */
  min-width: 0;
}

.item-container span,
.edit-container {
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  max-width: 220px;
  padding: 6px;
  font-size: 12px;
  /* Make input look like span */
  border: none;

}

.edit-container:focus {

  background: #f5f5f5;
  border: 1px solid #ccc;
}

.button-group {
  display: flex;
  gap: 6px;
  min-width: 100px; /* Prevent shrinking when editing */
  justify-content: flex-end;
}


</style>