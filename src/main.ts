import './style.css'
import {v4} from 'uuid'

const taskForm = document.querySelector<HTMLButtonElement>('#task-form')
const taskList = document.querySelector<HTMLDivElement>('#tasks-list')

interface Task {
  title: string
  description: string
  id: string
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', e=> {
  e.preventDefault()

  const description  = taskForm['description'] as unknown as HTMLTextAreaElement
  const title = taskForm['title'] as unknown as HTMLInputElement
  
  tasks.push({
    title: title.value,
    description: description.value,
    id: v4()
  })
  
  localStorage.setItem('tasks', JSON.stringify(tasks))
  renderTasks(tasks)
  taskForm.reset()
})

document.addEventListener('DOMContentLoaded', () => {
  renderTasks(JSON.parse(localStorage.getItem('tasks') || '[]'))
})

function renderTasks(tasks: Task[]) {
  taskList!.innerHTML = ''
  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-900 mb-3 mt-3 rounded-md p-5 hover:bg-zinc-800 hover:cursor-pointer'
  
    const header = document.createElement('header')
    const title = document.createElement('span')
    const deleteBtn = document.createElement('button')
    const copyBtn = document.createElement('button')
    const buttonsContainer = document.createElement('div')
    const description = document.createElement('p')

    header.className = 'flex justify-between'
    buttonsContainer.className = 'flex gap-3'

    deleteBtn.innerText = 'Delete'
    deleteBtn.className = 'bg-red-500 hover:bg-red-600 transition p-1 pl-2 pr-2 rounded-md'

    deleteBtn.addEventListener('click', e => {
      const index = tasks.findIndex(t => t.id === task.id )
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTasks(tasks)
    }
    )

    copyBtn.innerText = 'Copy'
    copyBtn.className = 'bg-green-500 hover:bg-green-600 transition p-1 pl-2 pr-2 rounded-md'

    copyBtn.addEventListener('click', e => {
      const storage = document.createElement('textarea');
      storage.value = title.innerHTML + ': ' + description.innerHTML;
      description.appendChild(storage)

      storage.select();
      storage.setSelectionRange(0, 99999);
      document.execCommand('copy');
      description.removeChild(storage)
    })

    title.innerText = task.title
    description.innerText = task.description

    console.log(task.title)

    header.append(title)
    buttonsContainer.append(copyBtn)
    buttonsContainer.append(deleteBtn)
    header.append(buttonsContainer)

    taskElement.append(header)
    taskElement.append(description)
    taskList?.append(taskElement)
  })
}