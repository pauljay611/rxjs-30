import React from 'react'
import { actionsType } from './actions'
import { connect } from 'react-redux'

const Component = ({ onClickHandler, data, loading }) => {
	return (
		<div>
			<h1>Redux-Observable</h1>
			<button
				onClick={() => {
					onClickHandler()
				}}
			>
				fetch data
			</button>
			{loading && <div className="loading">Loading</div>}
			{data && <div className="list">{data.name}</div>}
		</div>
	)
}

const mapStateToProps = ({ data, loading }) => {
	return {
		data,
		loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClickHandler: () => {
			dispatch({
				type: actionsType.FETCH_DATA,
				payload: 1
			})
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Component)

export default Container
