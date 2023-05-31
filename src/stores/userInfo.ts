import { defineStore } from 'pinia'
import type { DocumentData } from 'firebase/firestore'

interface UserInfoState {
  userInfo: DocumentData | null
}

export const useUserInfoStore = defineStore('userInfo', {
  state: (): UserInfoState => ({
    userInfo: null,
  }),
  actions: {
    setUserInfo(userInfo: DocumentData) {
      this.userInfo = userInfo
    },
    clearUserInfo() {
      this.userInfo = null
    },
  },
})
