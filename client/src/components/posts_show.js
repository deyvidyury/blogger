import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
	componentDidMount(){
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}

	onEditClick(){
		const {id} = this.props.match.params;

		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	onDeleteClick(){
		const {id} = this.props.match.params;

		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	render(){
		const {post} = this.props;

		if(!post){
			return <div>Loading...</div>
		}
		console.log(post);
		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>Delete Post</button>
				<Link className="btn btn-warning pull-xs-right" to={`/posts/edit/${post._id}`}>
					Edit
					</Link>
				
				<h3>{post.title}</h3>
				<p>{post.body}</p>
				<small>Created at: {Date(post.created_at)}</small>
				<small>{post.updated_at ? ' Updated at: '+Date(post.updated_at) : ''}</small>
			</div>
		)
	}
}

function mapStateToProps({posts}, ownProps){
	return { post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchPost, deletePost})(PostsShow);