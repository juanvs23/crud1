import React from 'react'
import Loader from '../loader/loader'
import ElementoLista from './ElementoLista'
import './lista.css'




class List extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ loading: false })
        }, 3000)


    }

    render() {
        let posts = this.props.posts
        //console.log(this.state.loading)

        return (
            <div className="content-posts col-lg-10">
            {
                posts.map((post,i) => {


        if (this.state.loading === true) {
            return <Loader key={i}/>
        }
        else if (this.state.loading === false) {
        
            return <ElementoLista key={i} borrarPost={this.props.borrarPost}  post={post}/>

        }

        })
            }
            
            </div>
        )
    }
}
export default List
