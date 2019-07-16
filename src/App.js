
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

	render() {
	
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div
						className= "col-xs-4 col-sm-4 col-md-4 col-lg-4" 
					>
						<TaskForm/>
						{/* {elmTaskForm} */}
					</div>
					<div
						className=
							
								 "col-xs-8 col-sm-8 col-md-8 col-lg-8"
								
						
					>
						<button
							type="button"
							className="btn btn-primary"
							//onClick={this.onThemCongViec}
						>
							<span className="fa fa-plus mr-5" />
							Thêm Công Việc
						</button>
						<button
							type="button"
							className="btn btn-warning"
						//	onClick={this.taoDuLieu}
						>
							<span className="fa fa-plus mr-5" />
							Tạo Dữ Liệu Mẫu
						</button>
						{/* Search And Sort*/}
						<TaskControl
							// onSearch={this.onSearch}
							// onSort={this.onSort}
							// sortBy={sortBy}
							// sortValue={sortValue}
						/>
						<TaskList
							// tasks={tasks}
							// onUpdateStatus={this.onUpdateStatus}
							// onDelete={this.onDelete}
							// onUpdate={this.onUpdate}
							// onFilter={this.onFilter}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
