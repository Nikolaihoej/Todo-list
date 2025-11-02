<template>
  <div class="container">
    <div class="content">
      <div class="header" @click="randomFont" :style="{ fontFamily: headerFont }">
        <h2 class="header-text">Todo List</h2>
      </div>
      <div class="main-content">
        <div class="todo-panel">
          <form class="submitform" @submit.prevent="addTodo">
            <input v-model="newTodo" :class="{ 'max-reached': isMax }" placeholder="Add a todo..." :maxlength="maxLength" />
            <button class="add-btn" type="submit">Add</button>
          </form>
          <div class="char-count" :class="{ 'max-reached': isMax }">
            {{ 100 - newTodo.length }} characters left
          </div>
          <div class="todolist-container">
              <ul class="todolist">
                <TodoItem v-for="todo in todos" :key="todo._id" :todo="todo" @remove="removeTodo" @edit="updateTodo"/>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchTodos, addTodo as apiAddTodo, removeTodo as apiRemoveTodo, updateTodo as apiUpdateTodo } from '../services/todoService.js'
import TodoItem from './TodoItem.vue'

const todos = ref([])
const newTodo = ref('')
const maxLength = 100
const isMax = computed(() => newTodo.value.length >= maxLength)

// Edit state
const editingId = ref(null)
const editingText = ref('')

// Font switching logic
const headerFont = ref('inherit')
const fonts = ref([])
const GOOGLE_FONTS_API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY 

onMounted(async () => {
  todos.value = await fetchTodos()
  await fetchFonts()
})

async function fetchFonts() {
  const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`)
  const data = await res.json()
  fonts.value = data.items.map(f => f.family)
}

function randomFont() {
  if (!fonts.value.length) return
  const font = fonts.value[Math.floor(Math.random() * fonts.value.length)]
  // Dynamically load the font
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css?family=${font.replace(/ /g, '+')}`
  document.head.appendChild(link)
  headerFont.value = `'${font}', cursive, sans-serif`
}

async function addTodo() {
  if (!newTodo.value.trim() || newTodo.value.length > maxLength) return
  const todo = await apiAddTodo(newTodo.value)
  todos.value.push(todo)
  newTodo.value = ''
}

async function updateTodo(updatedTodo) {
  const todo = await apiUpdateTodo(updatedTodo._id, { text: updatedTodo.text })
  const idx = todos.value.findIndex(t => t._id === updatedTodo._id)
  if (idx !== -1) todos.value[idx] = todo
}

async function removeTodo(id) {
  const res = await apiRemoveTodo(id)
  if (res.ok) {
    todos.value = await fetchTodos()
  } else {
    let errMsg = res.statusText
    try {
      const err = await res.json()
      errMsg = err.message || errMsg
    } catch {
      // response is not JSON (probably HTML error page)
    }
    alert('Failed to delete: ' + errMsg)
  }
}

</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

.content {
  background-color: rgb(231, 231, 231);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  max-width: 273px;
  color: rgb(48, 48, 48);
}
.main-content {
  padding: 12px;
}

.header {
  user-select: none;
  cursor: pointer;
  height: auto;
  text-align: left;
  border-radius: 8px 8px 0 0;
  background-color: rgb(80, 143, 99);
  color: white;
}

.header-text {
  margin: 0;
  padding-left: 28px;
  font-size: 24px;
  font-weight: bold;
  padding-top: 6px;
  padding-bottom: 6px;
}

.submitform {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.submitform input {
  flex: 1;
  padding: 8px;
  border: 2px solid rgb(212, 212, 212);
  border-radius: 6px;
  font-size: 12px;
  transition: border-color 0.2s;
}

.submitform input:focus {
  border-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  outline: none;
}

.submitform input.max-reached {
  border-color: darkred;
  color: darkred;
}

.char-count.max-reached {
  color: darkred;
}

.add-btn {
  background-color: rgb(80, 143, 99);
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  border: 2px solid rgb(80, 143, 99);
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-btn:hover {
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.char-count {
  font-size: 11px;
  color: #888;
  margin-top: -8px;
  margin-bottom: 12px;
  text-align: left;
}

.todolist-container {
  margin-top: 16px;
}

.todolist {
  list-style-type: none;
  padding: 0;
  margin: 0;
}




</style>