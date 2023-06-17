import { defineStore } from 'pinia'

export const useClockOut = defineStore('clockOut', {
  state: () => ({
    clockOut: '',
  }),
  actions: {
    setClockOut(dateString:string) {
      this.clockOut = dateString
    },
    clearClockOut(){
      this.clockOut = ''
    }
  },
  getters:{
    getClockOut():string {
      return this.clockOut
    },
  }
})