import React from 'react'
import { Link } from 'react-router-dom'
import './post.css'
import Loader from '../loader/loader'

const Post = ({ post, borrarPost }) => {
    console.log(post)
    if (!post) {
        return <Loader/>
    }

    else {
        let { userId, id, title, body } = post
        return (<div className="card" >
  <div className="card-body">
    <h2 className="card-title ">{title}</h2>
    <blockquote className="blockquote">
    <p className="text-center">{body}</p>
    </blockquote >
    <hr/>
    <h6 className="card-subtitle mb-2 text-muted">Creado por "{userId}"</h6>
     <hr/>
    <Link to={`/list`}  className="btn btn-primary">Regresar</Link>
    <Link to={`/edit/${id}`} className="btn btn-danger">Editar</Link>
  </div>
</div>)
    }

}

export default Post
