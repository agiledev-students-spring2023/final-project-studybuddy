import { Button } from "react-bootstrap";
import React from "react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

const SearchBtnWithFilter = () => (
	<div className="row p-2 text-center mt-4">
		<div className="col-4 p-1">
			<Button variant="secondary" size="sm">
				Search
			</Button>
		</div>
		<div className="col-8 border p-1">CS, Agile..., March 12, Online</div>
	</div>
);

const FilteredItem = () => (
	<div className="row border p-1 pt-2 pb-2 m-1">
		<p className="mb-1">Major of the Post's Buddy</p>
		<h5 className="mb-1">Subject Topic / Field</h5>
		<p className="m-0">Meeting Date and Time</p>
		<div className="row pt-2 pb-2">
			<div className="col-6 text-center">
				<button className="btn btm-md btn-primary">View Profile</button>
			</div>
			<div className="col-6 text-center">
				<button className="btn btn-md btn-secondary">Message</button>
			</div>
		</div>
	</div>
);

export default function FilteredScreen() {
	return (
		<>
			<TitleBar title="Related Post" backpage="/" />

			<div className="content-body">
				<div className="container-fluid pageLayout">
					<SearchBtnWithFilter />
					<FilteredItem />
					<FilteredItem />
					<FilteredItem />
					<FilteredItem />
				</div>
			</div>

			<Navbar user="test" />
		</>
	);
}
