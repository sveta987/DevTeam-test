import {defineStore} from "pinia";

export const useLoginStore = defineStore('login', {
        state: () => (
            {
                isLogin:!!localStorage.getItem('isLogin'),
                isLoading: false,
                isClickedLogOut: false
            }
        ),
        actions: {
            loginUser(){
                this.isLogin = true;
            },
            logOutUser(){
                this.isLogin = false;
            },
            loading(){
                this.isLoading = !this.isLoading;
            },
            clickLogOut(){
                this.isClickedLogOut = !this.isClickedLogOut;
            }
        },
    }
)
