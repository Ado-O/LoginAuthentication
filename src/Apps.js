import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase'
import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm'

class Apps extends Component {
    state = { loggedIn: null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDHOwnyPwnpW-lDsIHliboTDWYqyiO1R2w",
            authDomain: "auth-cdc09.firebaseapp.com",
            databaseURL: "https://auth-cdc09.firebaseio.com",
            projectId: "auth-cdc09",
            storageBucket: "auth-cdc09.appspot.com",
            messagingSenderId: "551801737016"
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        })
    }

    readerContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log out
                    </Button>
                )
            case false:
                return <LoginForm />
            default:
                return <Spinner size="large" />
        }

    }

    render() {
        return (
            <View>
                <Header headerText='Auth' />
                {this.readerContent()}
            </View>
        )
    }
}

export default Apps
