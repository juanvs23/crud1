import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Axios from 'axios'
import { useLocation, useHistory, useParams } from "react-router"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Config from '../../config'
import Header from '../header/header'
import List from '../lista/lista'
import New from '../nuevo/nuevo'
import Post from '../post/post'
import Edit from '../edit/edit'

class Router extends React.Component {


    state = {
        posts: []
    }
    componentDidMount() {
        this.obtenerPost()
    }
    obtenerPost = () => {
        let listaPost = `${Config.url}posts`
        //sistema realizado con fetch
        // console.log(listaPost)
        // fetch(listaPost).then((response) => {
        //         console.log(response)
        //         return response.json()
        //     })
        //     .then(datos => {
        //         //console.log(datos)
        //         this.setState({
        //             posts: datos
        //         })
        //         //console.log(this.state.posts)
        //     })
        Axios.get(listaPost).then(resp => {
            this.setState({
                posts: resp.data
            })

        })
    }
    borrarPost = (id) => {
        Axios.delete(`${Config.url}posts/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    const posts = [...this.state.posts]
                    let resultado = posts.filter((post) => (
                        post.id !== Number(id)
                    ))
                    this.setState({ posts: resultado })
                }
            })
    }
    nuevoPost = (datosPost) => {
        let { body, title } = datosPost
        Axios.post(`${Config.url}posts`, {
            title: title,
            body: body,
            userId: 1
        }).then((resp) => {
            if (resp.status === 201) {
                if (this.state.posts == []) {
                    this.obtenerPost()
                }

                const { body, title, id } = resp.data
                console.log(resp.data)
                let datosPost = { body: body, title: title, userId: 1 }

                this.setState({
                    posts: [...this.state.posts, datosPost]
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu mensaje a sido creado',
                    showConfirmButton: false,
                    timer: 1500
                })

            }
        })
    }
    editPost = (datosPost) => {

        Axios.put(`${Config.url}posts/${datosPost.id}`, { datosPost })
            .then((resp) => {
                if (resp.status === 200) {
                    //this.obtenerPost()//esto funciona para api normales
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Tu mensaje hga sido actualizado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    let idPost = resp.data.id

                    let posts = [...this.state.posts]
                    const edit = posts.findIndex(post => idPost === post.id) //buscar dentro de todos los posts el indice indicado y lo compora con uno dentro del arreglo

                    posts[edit] = datosPost

                    this.setState({
                        posts: posts
                    })

                }

            })
    }

    render() {

        let { posts } = this.state
        return (
            <BrowserRouter>
           
            <Header />
            
            <div className="container" >
              <div className="row justify-content-center" >
            <Switch >
             <Route exact  path="/" render={()=>{
                 return <List posts={posts}
                 borrarPost={this.borrarPost}
                 />
             }}  />
             <Route exact  path="/list" render={()=>{
                 return <List posts={posts}
                 borrarPost={this.borrarPost}
                 />
             }}  />
              <Route exact  path="/post/:postId" render={(props)=>{
              let urlPostnumber=props.location.pathname.replace('/post/',''),
              filtro= posts.filter((post)=>(
               post.id===Number(urlPostnumber)//pendiente usar esta funcion para convertir en numero ya que el replace lo convierte en string
              ))
                 return <Post post={filtro[0]} borrarPost={this.borrarPost} />
             }}  />
              <Route exact  path="/edit/:postId" render={(props)=>{
              let urlPostnumber=props.location.pathname.replace('/edit/',''),
              filtro= posts.filter((post)=>(
               post.id===Number(urlPostnumber)//pendiente usar esta funcion para convertir en numero ya que el replace lo convierte en string
              ))
                 return <Edit post={filtro[0]} EditPost={this.editPost} />
             }}  />
             <Route exact  path="/new" render={()=>{
                return <New nuevoPost={this.nuevoPost} />
             }}  />
            </Switch>
              
              </div>
            </div>
            
            
            </BrowserRouter>
        )
    }

}
export default Router
