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
	<div className="row">

	</div>
);

export default function FilteredScreen() {
    return (
        <>
            <TitleBar />

            <div className="content-body">
                <div className="container-fluid pageLayout">
					<SearchBtnWithFilter />
					<FilteredItem />
					<FilteredItem />
				</div>
            </div>

            <Navbar user="test" />
        </>
    );
}
