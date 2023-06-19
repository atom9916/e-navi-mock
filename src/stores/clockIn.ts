import { defineStore } from 'pinia'

export const useClockIn = defineStore('clockIn', {
  state: () => ({
    clockIn: '',
  }),
  actions: {
    setClockIn(dateString:string) {
      this.clockIn = dateString
    },
    clearClockIn(){
      this.clockIn = ''
    }
  },
  getters:{
    getClockIn():string {
      return this.clockIn
    },
  }
})