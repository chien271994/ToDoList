import React, { Component } from "react";

class TaskForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			name: "",
			status: false
		};
	}
	componentWillMount() {
		//console.log('dadasd')
		if (this.props.task) {
			this.setState({
				id: this.props.task.id,
				name: this.props.task.name,
				status: this.props.task.status
			});
		}
	}
	onDongForm = () => {
		this.props.onDongForm();
	};
	onChange = e => {
		var target = e.target;
		var { name, value } = target;
		if (name === "status") {
			value = target.value === "true" ? true : false;
		}
		this.setState({
			[name]: value
		});
	};
	onSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	};
	onClear = () => {
		this.setState({
			name: "",
			status: false
		});
		this.onDongForm();
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.task) {
			this.setState({
				id: nextProps.task.id,
				name: nextProps.task.name,
				status: nextProps.task.status
			});
		} else if (!nextProps.task) {
			this.setState({
				id: "",
				name: "",
				status: false
			});
		}
	}
	render() {
		// // Dựa vào id để kiểm tra lúc nào là màn thêm công việc hay cập nhật công việc
		var { id } = this.state;

		return (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">
						{id === "" ? "Thêm Công Việc" : "Cập Nhật Công Việc"}
						<span
							className="fa fa-times-circle text-right"
							onClick={this.onDongForm}
						/>
					</h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Tên :</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={this.state.name}
								onChange={this.onChange}
							/>
						</div>
						<label>Trạng Thái :</label>
						<select
							className="form-control"
							name="status"
							value={this.state.status}
							onChange={this.onChange}
						>
							<option value={true}>Kích Hoạt</option>
							<option value={false}>Ẩn</option>
						</select>
						<br />
						<div className="text-center">
							<button type="submit" className="btn btn-warning">
								Thêm
							</button>
							&nbsp;
							<button
								type="button"
								className="btn btn-danger"
								onClick={this.onClear}
							>
								Hủy Bỏ
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default TaskForm;
