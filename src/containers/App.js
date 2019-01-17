import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	async componentDidMount() {
			try {
				const resp = await fetch('https://jsonplaceholder.typicode.com/users')
				const users = await resp.json();
				this.setState({ robots: users });
			} catch (err) {
				console.log(err);
		}
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const { robots, searchfield } = this.state;
		const filterRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
			return !robots.length ?
				<h1>Loading</h1> :
				(
					<div className='tc'>
						<h1 className='f1'>RobotFriends</h1>
						<SearchBox searchChange={this.onSearchChange}/>
						<Scroll>
							<CardList robots={filterRobots}/>
						</Scroll>
					</div>
				);
		}
}

export default App;