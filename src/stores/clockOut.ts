import { defineStore } from 'pinia'

export const useClockOut = defineStore('clockOut', {
  state: () => ({
    clockOut: null as Date | null,
  }),
  actions: {
    setClockOut(date:Date) {
      this.clockOut = date
    },
    clearClockOut(){
      this.clockOut = null
    }
  },
  getters:{
    getClockOut():Date | null {
      return this.clockOut
    },
  }
})