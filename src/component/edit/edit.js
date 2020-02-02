import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../loader/loader'

class Edit extends React.Component {



    tituloRef = React.createRef()

    bodyRef = React.createRef()




    handlerSubmit = (e) => {

        e.preventDefault()

        const datosPost = {
            title: this.tituloRef.current.value,
            userId: this.props.post.userId,
            id: this.props.post.id,

            body: this.bodyRef.current.value
        }

        //this.props.EditPost(datosPost)
        this.props.EditPost(datosPost)


    }
    render() {

        if (!this.props.post) return <Loader />

        let { title, body } = this.props.post


        return (
            <form className="col-8 card" onSubmit={this.handlerSubmit}>
            <h3 className="text-center">Edita Post</h3>
            <fieldset >
    <div className="form-group">
      
      <input type="text" id="title" className={`form-control `} ref={this.tituloRef} defaultValue={title} />
     
      
    </div>
   
     <div className="form-group">
   
    <textarea className={`form-control `} id="body"  defaultValue={body} ref={this.bodyRef} rows = "7"></textarea>
    
  </div>
   
   
    <button type="submit" className="btn btn-success">Guardar</button><Link type="submit" to={'/'} className="btn btn-primary">Regresar</Link>
  </fieldset>
            </form>
        )
    }

}
export default Edit
