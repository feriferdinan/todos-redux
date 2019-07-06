import * as types from '../types';

export const addTodo = todo => ({
  type: types.ADD_TODO,
  payload: todo
})

export const editTodo = todo => ({
  type: types.EDIT_TODO,
  payload: todo
})

export const removeTodo = todo => ({
  type: types.REMOVE_TODO,
  payload: todo
})