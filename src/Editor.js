import React from 'react';
import { useState, useEffect } from 'react';

export default function Editor({ set_page_flow }) {

    
    function handle_change(e) {

	

    }

    function handle_data_update() {

	console.log("test")

	set_page_flow(10);

    }



    return (
	    <div className="editor">

	<div className="topbar">
	    
		<button onClick={handle_data_update}>Continue with entered set</button >
		    <div className="loading">The clinic set is not currently valid, hit F5/reload if you want to load defaults</div>

	</div>
	
	    
	</div>
    );
    
};
