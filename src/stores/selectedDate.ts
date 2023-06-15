import { defineStore } from 'pinia'

export const useStoreSelectedDate = defineStore('SelectedDate', {
  state: () => ({
    selectedDate: null as Date | null,
  }),
  actions: {
    setSelectedDate(date: Date) {
      this.selectedDate = date
    },
  },
  getters:{
    getSelectedDate():Date | null {
      return this.selectedDate
    },
  }
})
