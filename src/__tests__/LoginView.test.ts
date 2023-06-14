/**
 * @jest-environment jsdom
 */

import LoginViewVue from '@/views/LoginView.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { app } from '../firebase/firebase'
import { getAuth } from 'firebase/auth'

describe('LoginViewのテスト', () => {
  getAuth(app)

  it('初期表示としてからのメールアドレスとパスワードの入力欄が表示される', () => {
    const wrapper: VueWrapper = mount(LoginViewVue)
    console.log(wrapper.vm.$data)
    // expect(wrapper.vm.$data).toBe('')
  })

  // it('should disable button when disabled flag is true', async () => {
  //   wrapper.vm.disabled = true
  //   await wrapper.vm.$nextTick()

  //   const button = wrapper.find('button')
  //   expect(button.attributes('disabled')).toBe('disabled')
  // })

  // it('should enable button when disabled flag is false', async () => {
  //   wrapper.vm.disabled = false
  //   await wrapper.vm.$nextTick()

  //   const button = wrapper.find('button')
  //   expect(button.attributes('disabled')).toBeUndefined()
  // })

  // it('should update error message when error occurs', async () => {
  //   wrapper.vm.checkError('auth/user-not-found')
  //   await wrapper.vm.$nextTick()

  //   const errorElement = wrapper.find('p')
  //   expect(errorElement.text()).toBe('ユーザーが見つかりませんでした')
  // })

  // it('should call login method when form is submitted', async () => {
  //   const loginMock = jest.fn()
  //   wrapper.vm.login = loginMock

  //   const form = wrapper.find('form')
  //   await form.trigger('submit')

  //   expect(loginMock).toHaveBeenCalled()
  // })

  // // 以下、signInWithEmailAndPasswordなどのFirebase関連の処理に対するモックテスト

  // it('should call signInWithEmailAndPassword with correct arguments', async () => {
  //   const signInMock = jest.fn()
  //   wrapper.vm.signInWithEmailAndPassword = signInMock

  //   wrapper.vm.email = 'test@example.com'
  //   wrapper.vm.password = 'password'

  //   const form = wrapper.find('form')
  //   await form.trigger('submit')

  //   expect(signInMock).toHaveBeenCalledWith(wrapper.vm.auth, 'test@example.com', 'password')
  // })

  // it('should call router.push when signInWithEmailAndPassword succeeds', async () => {
  //   const pushMock = jest.fn()
  //   wrapper.vm.router.push = pushMock

  //   const signInMock = jest.fn(() => Promise.resolve())
  //   wrapper.vm.signInWithEmailAndPassword = signInMock

  //   const form = wrapper.find('form')
  //   await form.trigger('submit')

  //   expect(pushMock).toHaveBeenCalledWith('/')
  // })

  // it('should set disabled flag and clear password when signInWithEmailAndPassword fails', async () => {
  //   const signInMock = jest.fn(() => Promise.reject({ code: 'auth/wrong-password' }))
  //   wrapper.vm.signInWithEmailAndPassword = signInMock

  //   wrapper.vm.disabled = false
  //   wrapper.vm.password = 'password'

  //   const form = wrapper.find('form')
  //   await form.trigger('submit')

  //   expect(wrapper.vm.disabled).toBe(false)
  //   expect(wrapper.vm.password).toBe('')
  //   expect(wrapper.vm.error).toBe('')
  // })
})
