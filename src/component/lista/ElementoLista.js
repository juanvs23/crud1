import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'



class ElementoLista extends React.Component {

  confirmaEliminar = () => {
    const { id } = this.props.post
    console.log()

    Swal.fire({
      title: '¿Deseas borrar este mensaje?',
      text: "esta acción no tiene vuelta atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.props.borrarPost(id)
        Swal.fire(
          'Borrado',
          'El mensaje ha sido borrado.',
          'success'
        )
      }
    })

  }

  render() {
    const { id, body, title, userId } = this.props.post
    return (
      <div className="card" id={id} >
  <div className="row no-gutters">
    <div className="col-12 col-md-8 ">
      <div className="card-body">
        <h5 className="card-title">{title} - {id}</h5>
        <p className="card-text">{body}</p>
        <p className="card-text"><small className="text-muted">creado por {userId}</small></p>
      </div>
    </div>
    <div className="col-12 col-md-4 btn-content">
    <Link to={`/post/${id}`} className="btn btn-info btn-fab  btn-round"><i className="fa fa-eye"></i></Link>
    <Link to={`/edit/${id}`} className="btn btn-primary btn-fab btn-round"><i className="fa fa-pencil-square-o"></i></Link>
    <button type="button" onClick={this.confirmaEliminar} className="btn btn-danger btn-fab btn-round"><i className="fa fa-times"></i></button>{/*Recordar encerrar las funciones onclick enviadas por props con un una funcion arrow*/}
    
    </div>
  </div>
</div>

    )
  }
}
export default ElementoLista
