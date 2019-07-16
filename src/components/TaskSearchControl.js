import React, { Component } from "react";

class TaskSearchControl extends Component {
	constructor(props){
		super(props);
		this.state={
			keyword:''
		}
	}
	onChange=(e)=>{
		var target=e.target;
		var{name,value}=target;
		this.setState({
			[name]:value
		})
	}
	onSearch=(keyword)=>{
		this.props.onSearch(this.state.keyword)
	}
	render() {
		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<div className="input-group">
					<input
						name="keyword"
						type="text"
						className="form-control"
						onChange={this.onChange}
						value={this.state.keyword}
					/>
					<span className="input-group-btn">
						<button
							className="btn btn-primary"
							type="button"
							onClick={this.onSearch}
						>
							<span className="fa fa-search mr-5" />
							Tìm
						</button>
					</span>
				</div>
			</div>
		);
	}
}

export default TaskSearchControl;
