import { defineStore } from 'pinia'

export const useClockIn = defineStore('clockIn', {
  state: () => ({
    clockIn: null as Date | null,
  }),
  actions: {
    setClockIn(date:Date) {
      this.clockIn = date
    },
    clearClockIn(){
      this.clockIn = null
    }
  },
  getters:{
    getClockIn():Date | null {
      return this.clockIn
    },
  }
})