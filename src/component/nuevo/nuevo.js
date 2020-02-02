import React from 'react'
import { useLocation, useHistory, useParams } from "react-router"
import { Redirect } from 'react-router-dom'
import './nuevo.css'

export default class New extends React.Component {

    state = {
        tituloError: false,
        cuerpoError: false,
        cuerpoFalta: false
    }

    tituloRef = React.createRef()
    autorRef = React.createRef()
    bodyRef = React.createRef()

    handlerSubmit = (e) => {

        e.preventDefault()

        const datosPost = {
            title: this.tituloRef.current.value,
            userId: this.autorRef.current.value,
            body: this.bodyRef.current.value
        }
        if (datosPost.title === "" || datosPost.body === "" || this.bodyRef.current.value.length < 5) {
            console.log(this.bodyRef.current.value.length)
            if (datosPost.title === "") {
                this.setState({
                    tituloError: true
                })
            }
            if (datosPost.body === "") {
                this.setState({
                    cuerpoError: true
                })
            }
            if (this.bodyRef.current.value.length < 5) {
                this.setState({
                    cuerpoFalta: true
                })
            }

        }
        else {

            this.props.nuevoPost(datosPost)


        }
    }
    render() {


        let { tituloError, cuerpoError, cuerpoFalta } = this.state,
            errortitulo = "",
            errorBody = "",
            faltaNumero = "",
            textInfoBody = "",
            textInfoTitulo = ""

        if (tituloError) {
            errortitulo = 'error'
            textInfoTitulo = 'Este campo no puede quedar vacio '

            setTimeout(() => {
                this.setState({ tituloError: false })
                console.log(tituloError)
                errortitulo = ''
                textInfoTitulo = ''
            }, 3000);
        }
        if (cuerpoError) {
            errorBody = 'error'
            textInfoBody = 'No agrego ningun contenido'
            setTimeout(() => {
                this.setState({ cuerpoError: false })
                errorBody = ''
                textInfoBody = ''
            }, 3000);
        }
        if (cuerpoFalta) {
            errorBody = 'error'
            faltaNumero = 'Los caracteres son inferiores a 5'
            setTimeout(() => {
                this.setState({ cuerpoFalta: false })
                errorBody = ''
                faltaNumero = ''
            }, 3000);
        }

        return (
            <form className="col-8 card" onSubmit={this.handlerSubmit}>
            <h3 className="text-center">Nuevo Post</h3>
            <fieldset >
    <div className="form-group">
      
      <input type="text" id="title" className={`form-control ${errortitulo}`} ref={this.tituloRef} placeholder="Titulo" />
     
      <span className={`form-${errortitulo}`}>{textInfoTitulo} </span>
    </div>
     <div className="form-group">
      
      <input type="text" id="userId" className={`form-control `} ref={this.autorRef} placeholder="Autor" />
    </div>
     <div className="form-group">
   
    <textarea className={`form-control ${errorBody}`} id="body"  placeholder="Mensaje " ref={this.bodyRef} rows="3"></textarea>
    <span className={`form-${errorBody}`}>{textInfoBody} {faltaNumero}</span>
  </div>
   
   
    <button type="submit" className="btn btn-success">Enviar</button>
  </fieldset>
            </form>
        )
    }
}
