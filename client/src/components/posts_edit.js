import React, {Component} from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, savePost } from '../actions';
import $ from 'dateformat';

class PostsEdit extends Component {
	componentWillMount(){
		this.handleInitialize();
	}

	handleInitialize() {
		const initData = {
			"title": this.props.post.title,
			"body": this.props.post.body,
			"updated_at": $(Date.now(), 'isoDateTime')
		};

		this.props.initialize(initData);
	}

	renderField(field){
		const { meta: { touched, error }} = field;
		const className=`form-group ${touched && error ? 'has-danger' : ''}`
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
					type="text"
					className="form-control"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>	
		)
	}

	renderTextField(field){
		const { meta: { touched, error }} = field;
		const className=`form-group ${touched && error ? 'has-danger' : ''}`
		return (
			<div className={className}>
				<label>{field.label}</label>
				<textarea
					rows="20"
					className="form-control"
					{...field.input}
				>
				</textarea>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>	
		)
	}

	onSubmit(values){
		this.props.savePost(this.props.post._id,values, () => {
			this.props.history.push('/');
		});
	}

	render(){
		const { handleSubmit } = this.props;
		const now = new Date();
		
		return (
			<div>
				<Link to="/">Back to Index</Link>
				<h2>Edit Post</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

					<Field 
						label="Title"
						name="title"
						type="text"
						component={this.renderField}
					/>

					<Field 
						label="Post Content"
						name="body"
						component={this.renderTextField}
					/>
					<input type="hidden" name="updated_at" />
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/" className="btn btn-danger">Cancel</Link>
				</form>
			</div>
		)
	}
}

function validate(values){
	const errors = {};
	
	if(!values.title){
		errors.title = "Enter a title.";
	}

	if(!values.categories){
		errors.categories = "Enter some categories";
	}

	if(!values.content){
		errors.content = "Enter some content please";
	}

	return errors;
}

function mapStateToProps({posts}, ownProps){
	return {
		post: posts[ownProps.match.params.id]
	}
}

export default reduxForm({
	validate,
	form: 'PostsEditForm'
})(
	connect(mapStateToProps,{ fetchPost, savePost })(PostsEdit)
);