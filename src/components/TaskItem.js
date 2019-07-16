import React, { Component } from "react";

class TaskItem extends Component {
	render() {
		//nhận  this.props.{ tasks , index} truyền  từ App=>TasksList=>TasksItem
		//var { task, index } = this.props;
		return (
			<tr>
				<td> </td>
				<td> </td>
				<td className="text-center">
					<span
						className="label label-success"

						//onClick={this.onUpdateStatus}
					>
						"Kich Hoat" : "An"
					</span>
				</td>
				<td className="text-center">
					<button
						type="button"
						className="btn btn-warning" //onClick={this.onUpdate}
					>
						<span className="fa fa-pencil mr-5" />
						Sửa
					</button>
					&nbsp;
					<button
						type="button"
						className="btn btn-danger" //onClick={this.onDelete}
					>
						<span className="fa fa-trash mr-5" />
						Xóa
					</button>
				</td>
			</tr>
		);
	}
}

export default TaskItem;
