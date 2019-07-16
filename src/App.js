
/* Sơ đồ Component
    +)App
    ++)TaskForm ==> Component tương ứng với botton Thêm Công Việc
    ++)TaskList ==>Danh sách bảng hiển thị
        ++)TaskItem
    ++)TaskControl  ==>Tương ứng với tìm Kiếm và Sắp xếp
        ++)Search
        ++)Sort 
*/
import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskControl from "./components/TaskControl";
import TaskList from "./components/TaskList";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			isDilayForm: false,
			taskEditing: null,
			filter: {
				name: "",
				status: -1
			},
			keyword: "",
			sortBy: "",
			sortValue: 1
		};
	}
	componentWillMount() {
		if (localStorage && localStorage.tasks) {
			var tasks = JSON.parse(localStorage.tasks);
			this.setState({
				tasks: tasks
			});
		}
	}
	taoDuLieu = () => {
		//console.log('chạm vào'+'<-->'+'em đi')
		var tasks = [
			{
				id: this.taoID(),
				name: "học lập trình javascript",
				status: true
			},
			{
				id: this.taoID(),
				name: "học lập trình html",
				status: false
			},
			{
				id: this.taoID(),
				name: "học lập trình css",
				status: true
			},
			{
				id: this.taoID(),
				name: "học lập trình reactjs",
				status: true
			}
		];
		this.setState({
			tasks: tasks
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};
	s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	taoID() {
		return (
			this.s4() +
			this.s4() +
			this.s4() +
			this.s4() +
			"<->" +
			this.s4() +
			this.s4() +
			this.s4() +
			this.s4() +
			"<->" +
			this.s4() +
			this.s4() +
			this.s4() +
			this.s4()
		);
	}
	onThemCongViec = () => {
		if (this.state.isDilayForm && this.state.taskEditing !== null) {
			this.setState({
				isDilayForm: true,
				taskEditing: null
			});
		} else {
			this.setState({
				isDilayForm: !this.state.isDilayForm,
				taskEditing: null
			});
		}
	};
	onDongForm = () => {
		this.setState({
			isDilayForm: false
		});
	};
	onSubmit = data => {
		//console.log('cham vao');
		var { tasks } = this.state;
		if (data.id === "") {
			data.id = this.taoID();
			tasks.push(data);
		} else {
			var index = this.findIndex(data.id);
			tasks[index] = data;
		}
		this.setState({
			tasks: tasks
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
		this.onDongForm();
	};
	onUpdateStatus = id => {
		//	console.log('chao')
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks
			});
		}
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};
	findIndex = id => {
		var { tasks } = this.state;
		var result = -1;
		tasks.forEach((task, index) => {
			if (task.id === id) {
				result = index;
			}
		});
		return result;
	};
	onDelete = id => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if (index !== -1) {
			tasks.splice(index, 1);
			this.setState({
				tasks: tasks
			});
		}
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};
	onUpdate = id => {
		//console.log(id);
		var { tasks } = this.state;
		var index = this.findIndex(id);
		var taskEditing = tasks[index];

		this.setState({
			taskEditing: taskEditing
		});
		this.onShowForm();
	};
	onShowForm = () => {
		this.setState({
			isDilayForm: true
		});
	};
	onFilter = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus, 10);
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		});
		// console.log(filterName, "<->", filterStatus);
	};
	onSearch = keyword => {
		//console.log(keyword)
		this.setState({
			keyword: keyword
		});
	};
	onSort = (sortBy, sortValue) => {
		console.log(sortBy, "<->", sortValue);
		this.setState({
			sortBy: sortBy,
			sortValue: sortValue
		});
	};
	render() {
		var {
			tasks,
			isDilayForm,
			taskEditing,
			filter,
			keyword,
			sortBy,
			sortValue
		} = this.state;
		var elmTaskForm = isDilayForm ? (
			<TaskForm
				onDongForm={this.onDongForm}
				onSubmit={this.onSubmit}
				task={taskEditing}
			/>
		) : (
			""
		);
		if (filter) {
			if (filter.name) {
				tasks = tasks.filter(task => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1;
				});
			}
			tasks = tasks.filter(task => {
				if (filter.status === -1) {
					return task;
				} else {
					return task.status === (filter.status === 1 ? true : false);
				}
			});
		}
		if (keyword) {
			tasks = tasks.filter(task => {
				return task.name.toLowerCase().indexOf(keyword) !== -1;
			});
		}
		if (sortBy === "name") {
			tasks.sort((a, b) => {
				if (a.name > b.name) {
					return sortValue;
				} else if (a.name < b.name) {
					return -sortValue;
				} else {
					return 0;
				}
			});
		} else {
			tasks.sort((a, b) => {
				if (a.status > b.status) {
					return -sortValue;
				} else if (a.status < b.status) {
					return sortValue;
				} else {
					return 0;
				}
			});
		}
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div
						className={isDilayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}
					>
						{elmTaskForm}
					</div>
					<div
						className={
							isDilayForm
								? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
								: "col-xs-12 col-sm-12 col-md-12 col-lg-12"
						}
					>
						<button
							type="button"
							className="btn btn-primary"
							onClick={this.onThemCongViec}
						>
							<span className="fa fa-plus mr-5" />
							Thêm Công Việc
						</button>
						<button
							type="button"
							className="btn btn-warning"
							onClick={this.taoDuLieu}
						>
							<span className="fa fa-plus mr-5" />
							Tạo Dữ Liệu Mẫu
						</button>
						{/* Search And Sort*/}
						<TaskControl
							onSearch={this.onSearch}
							onSort={this.onSort}
							sortBy={sortBy}
							sortValue={sortValue}
						/>
						<TaskList
							tasks={tasks}
							onUpdateStatus={this.onUpdateStatus}
							onDelete={this.onDelete}
							onUpdate={this.onUpdate}
							onFilter={this.onFilter}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
