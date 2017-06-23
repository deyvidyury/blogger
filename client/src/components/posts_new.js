import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
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
				></textarea>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>	
		)
	}

	onSubmit(values){
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render(){
		const { handleSubmit } = this.props;
		return (
			<div>
				<h2>New Post</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field 
						label="Title"
						name="title"
						component={this.renderField}
					/>

					<Field 
						label="Post Content"
						name="body"
						component={this.renderTextField}
					/>
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

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null,{ createPost })(PostsNew)
);